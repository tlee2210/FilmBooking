package com.cinemas.repositories;

import com.cinemas.entities.CinemaImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaImageRespository extends JpaRepository<CinemaImages, Integer> {
}
