package com.cinemas.repositories;

import com.cinemas.entities.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CinemaRespository extends JpaRepository<Cinema, Integer> {
    Cinema findCinemaBySlug(String slug);

    Cinema findCinemaByName(String name);

    @Query("SELECT c FROM Cinema c WHERE c.name = ?1 AND c.id != ?2")
    Cinema findByNameWithId(String name, Integer id);

}
