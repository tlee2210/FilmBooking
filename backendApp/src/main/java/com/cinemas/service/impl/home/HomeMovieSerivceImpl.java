package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.HomeResponse;
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
    public List<ItemIntroduce> getMovieActiveLimitIntroduce() {
        List<Movie> movieList = movieRepository.getMovieForStatusIntroduce(MovieStatus.NOW_SHOWING);

        List<ItemIntroduce> movieIntroduces = new ArrayList<>();

        movieList.forEach(movie -> {
            ItemIntroduce movieIntroduce = new ItemIntroduce();
            ObjectUtils.copyFields(movie, movieIntroduce);
            movieIntroduce.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
            movieIntroduces.add(movieIntroduce);
        });

        return movieIntroduces;
    }

    @Override
    public HomeResponse getAllMovie() {
        List<ItemIntroduce> movieComingSoom = movieRepository.getMovieForStatus(MovieStatus.COMING_SOON);
        List<ItemIntroduce> movieNowShow = movieRepository.getMovieForStatus(MovieStatus.NOW_SHOWING);

        movieComingSoom.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
//            movie.setTrailer(movieRepository.findTrailerByid(movie.getId()));
        });
        movieNowShow.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
//            movie.setTrailer(movieRepository.findTrailerByid(movie.getId()));
        });
        HomeResponse homeResponse = new HomeResponse();
        homeResponse.setMovieShowingList(movieNowShow);

        homeResponse.setMovieSoonList(movieComingSoom);
        return homeResponse;
    }

    @Override
    public List<Movie> getAllMovie2() {
        List<Movie> movies = movieRepository.findAll();

        movies.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
//            movie.setTrailer(movieRepository.findTrailerByid(movie.getId()));
        });

        return movies;
    }

    @Override
    public Movie getMoiveBySlug(String slug) {
        Movie movie = movieRepository.findBySlug(slug);

        if (movie == null) throw new AppException(NOT_FOUND);

        movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));

        return movie;
    }
}
