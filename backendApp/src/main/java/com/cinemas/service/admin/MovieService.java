package com.cinemas.service.admin;

import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

import java.io.IOException;

public interface MovieService {
    SelectOptionAndModelReponse<Page<Movie>> getAllMovie(SearchMovie searchMovie);

    SelectOptionMovie<?> getCreateMovie();

    boolean addMovie(MovieRequest movieRequest) throws IOException;

    Integer deleteMovie(String slug) throws IOException;

    SelectOptionMovie<Movie> getEditCelebrityBySlug(String slug);

    boolean updateMovie(MovieRequest movieRequest) throws IOException;

    Movie findMovieById(Integer id);
}
