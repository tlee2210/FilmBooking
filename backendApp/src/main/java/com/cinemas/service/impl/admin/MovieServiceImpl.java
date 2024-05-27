package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
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
import java.util.ArrayList;
import java.util.List;
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
    private CinemaRespository cinemaRespository;

    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<Movie> getAllMovie(PaginationHelper paginationHelper) {
        List<Movie> movieList = movieRepository.findAllWithBasicDetail();

        movieList.forEach(movie -> {
//            String imageUrl = ;
            String videoUrl = fileStorageServiceImpl.getUrlFromPublicId(movie.getTrailer());
//            movie.setImage(imageUrl);
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });

        PagedListHolder<Movie> pagedListHolder = new PagedListHolder<Movie>(movieList);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Movie> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Movie> movies = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), movieList.size());
        return movies;
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

        return new SelectOptionMovie<>(optionsCategory, optionsDirector, optionsActor);
    }

    @Override
    public boolean addMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = new Movie();
        if(movieRepository.findByName(movieRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(movieRequest, movie);

        //set slug
        String slug = movieRequest.getName().toLowerCase().replaceAll("\\s+", "-");
        movie.setSlug(slug);

        //set country
        Country Country = countryRepository.findById(movieRequest.getCountryId());

        movie.setCountry(Country);

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

        //set image
        movie.setImageLandscape(fileStorageServiceImpl.uploadFile(movieRequest.getImageLandscape(), "movie"));

        movie.setImagePortrait(fileStorageServiceImpl.uploadFile(movieRequest.getImagePortrait(), "movie"));
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

        return new SelectOptionMovie<>(optionsCategory, optionsDirector, optionsActor, movie);
    }

    @Override
    public boolean updateMovie(MovieRequest movieRequest) throws IOException {
        Movie movie = movieRepository.findById(movieRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if(movieRepository.findByNameWithId(movieRequest.getName(), movieRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(movieRequest, movie);
//        movie.setCategories(null);
        if(!movieRequest.getImageLandscape().isEmpty()){
            fileStorageServiceImpl.deleteFile(movie.getImageLandscape());
            movie.setImageLandscape(fileStorageServiceImpl.uploadFile(movieRequest.getImageLandscape(), "movie"));
        }

        if(!movieRequest.getImagePortrait().isEmpty()){
            fileStorageServiceImpl.deleteFile(movie.getImagePortrait());
            movie.setImagePortrait(fileStorageServiceImpl.uploadFile(movieRequest.getImagePortrait(), "movie"));
        }

        //set slug
        String slug = movieRequest.getName().toLowerCase().replaceAll("\\s+", "-");
        movie.setSlug(slug);

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

        movieRepository.save(movie);
        return true;
    }
}
