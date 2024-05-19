package com.cinemas.service.impl.admin;

import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.entities.MovieGenre;
import com.cinemas.repositories.MovieGenreRepository;
import com.cinemas.service.admin.MovieGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MovieGenreServiceImpl implements MovieGenreService {
    @Autowired
    private MovieGenreRepository movieGenreRepository;

    @Override
    public List<MovieGenre> getAllGenres() {
        List<MovieGenre> movieGenres = movieGenreRepository.findAll();
        return movieGenres;
    }

    @Override
    public MovieGenre getGenreById(int id) {
        MovieGenre movieGenre = movieGenreRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid id"));
        return movieGenre;
    }

    @Override
    public void saveGenre(MovieGenreRequest movieGenre) {
        MovieGenre movieGenreEntity = new MovieGenre();
        movieGenreEntity.setName(movieGenre.getName());
        movieGenreRepository.save(movieGenreEntity);
    }

    @Override
    public void updateGenre(int id, MovieGenreRequest movieGenre) {
        MovieGenre movieGenreOld = getGenreById(id);
        if (movieGenreOld != null){
            movieGenreOld.setName(movieGenre.getName());
            movieGenreRepository.save(movieGenreOld);
        }
    }

    @Override
    public void deleteGenre(int id) {
        MovieGenre movieGenreOld = getGenreById(id);
        movieGenreRepository.delete(movieGenreOld);
    }
}
