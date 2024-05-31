package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;

import java.text.Normalizer.Form;

import com.cinemas.dto.request.PriceRequest;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.*;
import com.cinemas.service.admin.MovieService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private CelebrityRepository celebrityRepository;

    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public SelectOptionAndModelReponse<Page<Movie>> getAllMovie(SearchMovie paginationHelper) {
        List<Movie> movieList = movieRepository.searchMovie(paginationHelper.getName(), paginationHelper.getCountryId(), paginationHelper.getMovieStatus());

        movieList.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });

        PagedListHolder<Movie> pagedListHolder = new PagedListHolder<Movie>(movieList);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Movie> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Movie> movies = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), movieList.size());

        List<SelectOptionReponse> optionsStatus = new ArrayList<>();

        for (MovieStatus movieStatus : MovieStatus.values()) {
            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
        }

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        return new SelectOptionAndModelReponse<>(movies, optionsCountries, optionsStatus);
    }

    @Override
    public SelectOptionMovie<?> getCreateMovie() {
        List<SelectOptionReponse> optionsCategory = new ArrayList<>();
        List<MovieGenre> categories = movieGenreRepository.findAll();

        for (MovieGenre category : categories) {
            optionsCategory.add(new SelectOptionReponse(category.getId(), category.getName()));
        }

        List<SelectOptionReponse> optionsActor = new ArrayList<>();
        List<Celebrity> actors = celebrityRepository.findByRole(RoleCeleb.ACTOR);

        for (Celebrity actor : actors) {
            optionsActor.add(new SelectOptionReponse(actor.getId(), actor.getName()));
        }

        List<SelectOptionReponse> optionsDirector = new ArrayList<>();
        List<Celebrity> directors = celebrityRepository.findByRole(RoleCeleb.DIRECTOR);

        for (Celebrity director : directors) {
            optionsDirector.add(new SelectOptionReponse(director.getId(), director.getName()));
        }

        List<SelectOptionReponse> optionsStatus = new ArrayList<>();

        for (MovieStatus movieStatus : MovieStatus.values()) {
            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
        }

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        return new SelectOptionMovie<>(optionsCategory, optionsDirector, optionsActor, optionsStatus, optionsCountries);
    }

    @Override
    public boolean addMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = new Movie();
        if (movieRepository.findByName(movieRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        //set image
        String ImageLandscape = fileStorageServiceImpl.uploadFile(movieRequest.getImageLandscape(), "movie");
        movie.setImageLandscape(ImageLandscape);

        String ImagePortrait = fileStorageServiceImpl.uploadFile(movieRequest.getImagePortrait(), "movie");
        movie.setImagePortrait(ImagePortrait);

        ObjectUtils.copyFields(movieRequest, movie);
        movie.setStatus(movieRequest.getStatus());
        //set slug
        movie.setSlug(movieRequest.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));


        movie.setCountry(countryRepository.findById(movieRequest.getCountryId()));

        //set movie genre
        List<MovieGenre> genres = movieRequest.getCategoriesIds().stream().map(id -> movieGenreRepository.getById(id))
                .collect(Collectors.toList());
        movie.setCategories(genres);

        //set celebrity
        List<Celebrity> actors = movieRequest.getActorId().stream().map(id -> celebrityRepository.getById(id))
                .collect(Collectors.toList());
        movie.setActor(actors);

        List<Celebrity> directors = movieRequest.getDirectorId().stream().map(id -> celebrityRepository.getById(id))
                .collect(Collectors.toList());
        movie.setDirector(directors);

        if (!movieRequest.getPrices().isEmpty()) {
            List<PriceMovie> prices = new ArrayList<>();
            movieRequest.getPrices().forEach(price -> {
                PriceMovie priceMovie = new PriceMovie(price.getDate(), price.getPrice());
                priceMovie.setMovie(movie);
                prices.add(priceMovie);
            });

            movie.setPriceMovies(prices);
        }

        movieRepository.save(movie);

        return true;
    }

    @Override
    public Integer deleteMovie(String slug) throws IOException {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(movie.getImageLandscape());
        fileStorageServiceImpl.deleteFile(movie.getImagePortrait());
        movieRepository.delete(movie);
        return movie.getId();
    }

    @Override
    public SelectOptionMovie<Movie> getEditCelebrityBySlug(String slug) {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));

        List<SelectOptionReponse> optionsCategory = new ArrayList<>();
        List<MovieGenre> categories = movieGenreRepository.findAll();

        for (MovieGenre category : categories) {
            optionsCategory.add(new SelectOptionReponse(category.getId(), category.getName()));
        }

        List<SelectOptionReponse> optionsActor = new ArrayList<>();
        List<Celebrity> actors = celebrityRepository.findByRole(RoleCeleb.ACTOR);

        for (Celebrity actor : actors) {
            optionsActor.add(new SelectOptionReponse(actor.getId(), actor.getName()));
        }

        List<SelectOptionReponse> optionsDirector = new ArrayList<>();
        List<Celebrity> directors = celebrityRepository.findByRole(RoleCeleb.DIRECTOR);

        for (Celebrity director : directors) {
            optionsDirector.add(new SelectOptionReponse(director.getId(), director.getName()));
        }

        List<SelectOptionReponse> optionsStatus = new ArrayList<>();

        for (MovieStatus movieStatus : MovieStatus.values()) {
            optionsStatus.add(new SelectOptionReponse(movieStatus.name(), movieStatus.getValue()));
        }

        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> optionsCountries = new ArrayList<>();

        for (Country country : countryList) {
            optionsCountries.add(new SelectOptionReponse(country.getId(), country.getName()));
        }

        return new SelectOptionMovie<>(optionsCategory, optionsDirector, optionsActor, optionsStatus, optionsCountries, movie);
    }

    @Override
    public boolean updateMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = movieRepository.findById(movieRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if (movieRepository.findByNameWithId(movieRequest.getName(), movieRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        String ImagePortrait = movie.getImagePortrait();
        String ImageLandscape = movie.getImageLandscape();

        ObjectUtils.copyFields(movieRequest, movie);
        if (movieRequest.getImageLandscape() != null && !movieRequest.getImageLandscape().isEmpty()) {
            fileStorageServiceImpl.deleteFile(movie.getImageLandscape());
            movie.setImageLandscape(fileStorageServiceImpl.uploadFile(movieRequest.getImageLandscape(), "movie"));
        } else {
            movie.setImageLandscape(ImageLandscape);
        }

        if (movieRequest.getImagePortrait() != null && !movieRequest.getImagePortrait().isEmpty()) {
            fileStorageServiceImpl.deleteFile(movie.getImagePortrait());
            movie.setImagePortrait(fileStorageServiceImpl.uploadFile(movieRequest.getImagePortrait(), "movie"));
        } else {
            movie.setImagePortrait(ImagePortrait);
        }

        //set slug
        movie.setSlug(movieRequest.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));

        //set country
        movie.setCountry(countryRepository.findById(movieRequest.getCountryId()));

        //set movie genre
        List<MovieGenre> genres = movieRequest.getCategoriesIds().stream().map(id -> movieGenreRepository.getById(id))
                .collect(Collectors.toList());
        movie.setCategories(genres);

        //set actors
        List<Celebrity> actors = movieRequest.getActorId().stream().map(id -> celebrityRepository.getById(id))
                .collect(Collectors.toList());
        movie.setActor(actors);

        //set directors
        List<Celebrity> directors = movieRequest.getDirectorId().stream().map(id -> celebrityRepository.getById(id))
                .collect(Collectors.toList());
        movie.setDirector(directors);

        if (!movieRequest.getPrices().isEmpty()) {
            movie.getPriceMovies().clear();

            movieRequest.getPrices().forEach(price -> {
                PriceMovie priceMovie = new PriceMovie(price.getDate(), price.getPrice());
                priceMovie.setMovie(movie);
                movie.getPriceMovies().add(priceMovie);
            });
        }

        movieRepository.save(movie);
        return true;
    }

}
