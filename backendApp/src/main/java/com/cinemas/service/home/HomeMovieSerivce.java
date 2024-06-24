package com.cinemas.service.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.request.SearchMovieHome;
import com.cinemas.dto.response.MovieIntroduce;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HomeMovieSerivce {
    List<Movie> getMovieActive();

    List<Movie> getMovieSoon();

    List<Movie> getMovieActiveNoLimit();

    List<Movie> getMovieSoonNoLimit();

    Movie getMoiveBySlug(String slug);

    List<Movie> getListMovieSoon();
    List<MovieIntroduce> getMovieActiveLimitIntroduce();
}
