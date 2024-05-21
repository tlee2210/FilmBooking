package com.cinemas.service.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface MovieService {
    Page<Movie> getAllMovie(PaginationHelper paginationHelper);

    List<SelectOptionReponse> getCreateMovie();

    boolean addMovie(MovieRequest movieRequest) throws IOException;

    Integer deleteMovie(String slug) throws IOException;

    EditSelectOptionReponse<Movie> getEditCelebrityBySlug(String slug);

    boolean updateMovie(MovieRequest movieRequest) throws IOException;
}
