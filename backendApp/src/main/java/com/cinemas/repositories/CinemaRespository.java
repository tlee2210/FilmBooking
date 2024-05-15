package com.cinemas.repositories;

import com.cinemas.entities.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRespository extends JpaRepository<Cinema, Integer> {
}
