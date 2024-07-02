package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchFilmRequest;
import com.cinemas.dto.response.HomeFilmResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.ReviewType;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.*;
import com.cinemas.service.home.HomeFilmService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.cinemas.enums.MovieStatus.*;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class HomeFilmServiceImpl implements HomeFilmService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private imageDescriptionRespository imageDescriptionRespository;

    @Override
    public SelectOptionAndModelReponse<Page<ItemIntroduce>> getAllFilms(SearchFilmRequest searchFilmRequest) {

        List<ItemIntroduce> movieList = movieRepository.searchFilm(searchFilmRequest.getCategory(), searchFilmRequest.getCountry(), searchFilmRequest.getYear(), searchFilmRequest.getStatus());

        movieList.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });

        PagedListHolder<ItemIntroduce> pagedListHolder = new PagedListHolder<ItemIntroduce>(movieList);
        pagedListHolder.setPage(searchFilmRequest.getPageNo());
        pagedListHolder.setPageSize(searchFilmRequest.getPageSize());

        List<ItemIntroduce> pageList = pagedListHolder.getPageList();
        boolean ascending = searchFilmRequest.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(searchFilmRequest.getSortByColumn(), true, ascending));

        Page<ItemIntroduce> movies = new PageImpl<>(pageList, new PaginationHelper().getPageable(searchFilmRequest), movieList.size());

        List<SelectOptionReponse> optionsStatus = new ArrayList<>();
        optionsStatus.add(new SelectOptionReponse<>(NOW_SHOWING.name(), NOW_SHOWING.getValue()));
        optionsStatus.add(new SelectOptionReponse<>(COMING_SOON.name(), COMING_SOON.getValue()));

//        for (MovieStatus movieStatus : values()) {
//            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
//        }

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getSlug(), country.getName()));
        }

        List<SelectOptionReponse> optionsCategory = new ArrayList<>();
        List<MovieGenre> categories = movieGenreRepository.findAll();

        for (MovieGenre category : categories) {
            optionsCategory.add(new SelectOptionReponse(category.getSlug(), category.getName()));
        }

        List<SelectOptionReponse> optionsYear = new ArrayList<>();
        List<Integer> dates = movieRepository.getYears();

        for (Integer date : dates) {
            optionsYear.add(new SelectOptionReponse(date, Integer.toString(date)));
        }

        return new SelectOptionAndModelReponse<>(movies, optionsCategory, optionsYear, optionsStatus, optionsCountries);
    }

    @Override
    public HomeFilmResponse getFilmDetail(String slug) {
        Movie movie = movieRepository.findBySlug(slug);

        List<Celebrity> actors = movie.getActor();
        List<Celebrity> directors = movie.getDirector();

        for (Celebrity actor : actors) {
            actor.setImage(fileStorageServiceImpl.getUrlFromPublicId(actor.getImage()));
            actor.setId(null);
            actor.setDateOfBirth(null);
            actor.setBiography(null);
            actor.setDescription(null);
            actor.setRole(null);
            actor.setCountry(null);
        }

        for (Celebrity director : directors) {
            director.setImage(fileStorageServiceImpl.getUrlFromPublicId(director.getImage()));
            director.setId(null);
            director.setDateOfBirth(null);
            director.setBiography(null);
            director.setDescription(null);
            director.setRole(null);
            director.setCountry(null);
        }

        movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));

        if (movie == null) throw new AppException(NOT_FOUND);
        HomeFilmResponse homeFilmResponse = new HomeFilmResponse();
        ObjectUtils.copyFields(movie, homeFilmResponse);

        List<Review> reviewList = reviewRepository.findByMovieId(movie.getId());

        List<List<imageDescription>> imgList = new ArrayList<>();

        for (Review review : reviewList) {
            List<imageDescription> imageDescriptionList = imageDescriptionRespository.findBySlug_name(review.getSlug());
            for (imageDescription imageDescription : imageDescriptionList) {
                imageDescription.setUrl(fileStorageServiceImpl.getUrlFromPublicId(imageDescription.getUrl()));
            }
            imgList.add(imageDescriptionList);
        }

        homeFilmResponse.setImages(imgList);
        List<ItemIntroduce> items = reviewRepository.reviewRelate(ReviewType.review);
        for (ItemIntroduce item : items) {
            item.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(item.getImagePortrait()));
        }
        homeFilmResponse.setReviews(items);
        return homeFilmResponse;
    }
}
