package com.cinemas.service.admin;

import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.entities.MovieGenre;

import java.util.List;

public interface MovieGenreService {
    List<MovieGenre> getAllGenres();
    MovieGenre getGenreById(int id);
    void saveGenre(MovieGenreRequest movieGenre);
    void updateGenre(int id, MovieGenreRequest movieGenre);
    void deleteGenre(int id);
}
