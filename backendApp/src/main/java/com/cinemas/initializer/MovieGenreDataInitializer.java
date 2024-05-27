package com.cinemas.initializer;

import com.cinemas.entities.MovieGenre;
import com.cinemas.repositories.MovieGenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MovieGenreDataInitializer {
    @Autowired
    MovieGenreRepository movieGenreRepository;

    public void initMovieGenre() {
        if (movieGenreRepository.count() == 0) {
            String[] genreNames = {
                    "Action", "Adventure", "Comedy", "Drama", "Horror",
                    "Science Fiction", "Fantasy", "Mystery", "Romance", "Thriller",
                    "Animation", "Documentary", "Family", "Musical", "Western",
                    "War", "Crime", "Biography", "Sport", "History"};

            List<MovieGenre> genres = new ArrayList<>();

            for (String genreName : genreNames) {
                MovieGenre genre = MovieGenre.builder()
                        .name(genreName)
                        .slug(generateSlug(genreName))
                        .build();
                genres.add(genre);
            }

            movieGenreRepository.saveAll(genres);
        }
    }

    private String generateSlug(String Name) {
        return Name.toLowerCase().replace(" ", "-");
    }

}
