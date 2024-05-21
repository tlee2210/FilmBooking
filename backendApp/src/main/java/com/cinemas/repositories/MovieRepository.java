package com.cinemas.repositories;

import com.cinemas.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT DISTINCT m FROM Movie m " +
            "JOIN FETCH m.country co " +
            "LEFT JOIN FETCH m.genres g")
    List<Movie> findAllWithBasicDetail();

    @Query("SELECT DISTINCT m FROM Movie m " +
            "LEFT JOIN FETCH m.celebrities c " +
            "WHERE m IN :movies")
    List<Movie> findAllWithCelebrities(List<Movie> movies);

    @Query("SELECT DISTINCT m FROM Movie m " +
            "LEFT JOIN FETCH m.cinemas ci " +
            "WHERE m IN :movies")
    List<Movie> findAllWithCinemas(List<Movie> movies);

    Movie findByName(String name);

    Movie findBySlug(String slug);

    @Query("SELECT m FROM Movie m WHERE m.name = ?1 AND m.id != ?2")
    Movie findByNameWithId(String name, int id);
}
