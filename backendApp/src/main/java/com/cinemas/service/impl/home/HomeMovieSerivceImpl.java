package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.service.home.HomeMovieSerivce;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class HomeMovieSerivceImpl implements HomeMovieSerivce {
    @Autowired
    private MovieRepository movieRepository;

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
    public List<ItemIntroduce> getMovieActiveLimitIntroduce() {
        List<Movie> movieList = movieRepository.getMovieForStatusIntroduce(MovieStatus.NOW_SHOWING);

        List<ItemIntroduce> movieIntroduces = new ArrayList<>();

        movieList.forEach(movie -> {
            ItemIntroduce movieIntroduce = new ItemIntroduce();
            ObjectUtils.copyFields(movie, movieIntroduce);
            movieIntroduce.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
            movieIntroduces.add(movieIntroduce);
        });

        return movieIntroduces;
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
        movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));

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
