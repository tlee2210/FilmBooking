package com.cinemas.repositories;

import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m FROM Movie m " +
            "JOIN FETCH m.country co " +
            "LEFT JOIN FETCH m.categories g")
    List<Movie> findAllWithBasicDetail();

    @Query("SELECT m FROM Movie m WHERE (:name is null or m.name like %:name%)" +
            "AND (:countryId is null or m.country.id = :countryId)" +
            "AND (:status is null or m.status = :status)")
    List<Movie> searchMovie(String name, Integer countryId, MovieStatus status);

    Movie findByName(String name);

    Movie findBySlug(String slug);

    @Query("SELECT m FROM Movie m WHERE m.name = ?1 AND m.id != ?2")
    Movie findByNameWithId(String name, int id);
}
