package com.cinemas.service.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.MovieGenre;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface MovieGenreService {
    Page<MovieGenre> getAllMovieGenre(SearchRequest searchRequest);
    MovieGenre getEditMovieGenreBySlug(String slug);
    boolean addMovieGenre(MovieGenreRequest movieGenre);
    boolean updateMovieGenre(MovieGenreRequest movieGenre);
    Integer deleteMovieGenre(String slug);
}
