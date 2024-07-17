package com.cinemas.repositories;

import com.cinemas.entities.MovieGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieGenreRepository extends JpaRepository<MovieGenre, Integer> {
    @Query("SELECT m FROM MovieGenre m WHERE m.name LIKE %?1%")
    List<MovieGenre> searchMovieGenre(String name);

    @Query("SELECT m FROM MovieGenre m WHERE m.name = ?1")
    MovieGenre findByName(String name);

//    @Query("SELECT m FROM MovieGenre m WHERE m.slug = ?1")
    MovieGenre findMovieGenreBySlug(String slug);

    @Query("SELECT m FROM MovieGenre m WHERE m.name = ?1 AND m.id != ?2")
    MovieGenre findByNameWithId(String name, int id);
}
