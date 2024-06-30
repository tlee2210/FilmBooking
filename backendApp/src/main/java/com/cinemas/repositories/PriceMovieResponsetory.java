package com.cinemas.repositories;

import com.cinemas.entities.PriceMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface PriceMovieResponsetory extends JpaRepository<PriceMovie, Integer> {
    @Query("SELECT p FROM PriceMovie p WHERE p.movie.name = :name AND p.date = :date")
    PriceMovie findPriceMovie(String name, LocalDate date);
}
