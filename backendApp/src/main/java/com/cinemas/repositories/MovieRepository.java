package com.cinemas.repositories;

import com.cinemas.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m FROM Movie m JOIN FETCH m.celebrities JOIN FETCH m.cinemas JOIN FETCH m.country JOIN FETCH m.genres")
    List<Movie> findAllWithDetail();
}
