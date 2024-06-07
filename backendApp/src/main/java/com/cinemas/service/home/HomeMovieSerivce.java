package com.cinemas.service.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.request.SearchMovieHome;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

public interface HomeMovieSerivce {
    SelectOptionAndModelReponse<Page<Movie>> getMovieActive(SearchMovieHome paginationHelper);

    SelectOptionAndModelReponse<Page<Movie>> getMovieSoon(SearchMovieHome paginationHelper);

    SelectOptionMovie<Movie> getMoiveBySlug(String slug);
}
