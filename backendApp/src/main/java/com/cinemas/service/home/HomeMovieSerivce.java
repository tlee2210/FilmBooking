package com.cinemas.service.home;

import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Movie;

import java.util.List;

public interface HomeMovieSerivce {
    List<Movie> getMovieActive();

    List<Movie> getMovieSoon();

    List<Movie> getMovieActiveNoLimit();

    List<Movie> getMovieSoonNoLimit();

    Movie getMoiveBySlug(String slug);

    List<Movie> getListMovieSoon();
    List<ItemIntroduce> getMovieActiveLimitIntroduce();
}
