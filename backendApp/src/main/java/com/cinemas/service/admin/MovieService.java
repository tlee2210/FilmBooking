package com.cinemas.service.admin;

import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface MovieService {
    SelectOptionAndModelReponse<Page<Movie>> getAllMovie(SearchMovie searchMovie);

    SelectOptionMovie<?> getCreateMovie();

    boolean addMovie(MovieRequest movieRequest) throws IOException;

    Integer deleteMovie(String slug) throws IOException;

    SelectOptionMovie<Movie> getEditCelebrityBySlug(String slug);

    boolean updateMovie(MovieRequest movieRequest) throws IOException;
}
