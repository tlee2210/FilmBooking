package com.cinemas.service.impl.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.request.SearchMovieHome;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieGenre;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.CountryRepository;
import com.cinemas.repositories.MovieGenreRepository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.service.home.HomeMovieSerivce;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class HomeMovieSerivceImpl implements HomeMovieSerivce {
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
    public List<Movie> getMovieActive() {
        List<Movie> movieList = movieRepository.getLimitMovie(MovieStatus.NOW_SHOWING, 8);

        movieList.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });

        return movieList;
    }

    @Override
    public List<Movie> getMovieSoon() {
        List<Movie> movieList = movieRepository.getLimitMovie(MovieStatus.COMING_SOON, 8);

        movieList.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });

        return movieList;
    }

    @Override
    public List<Movie> getMovieActiveNoLimit() {
        List<Movie> movieList = movieRepository.getMovieForStatus(MovieStatus.NOW_SHOWING);

        movieList.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });

        return movieList;
    }

    @Override
    public List<Movie> getMovieSoonNoLimit() {
        List<Movie> movieList = movieRepository.getMovieForStatus(MovieStatus.COMING_SOON);

        movieList.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });

        return movieList;
    }

    @Override
    public Movie getMoiveBySlug(String slug) {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));

        return movie;
    }

    @Override
    public List<Movie> getListMovieSoon() {
        List<Movie> movies = movieRepository.getLimitMovie(MovieStatus.COMING_SOON,3);
        movies.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });
        return movies;
    }
}
