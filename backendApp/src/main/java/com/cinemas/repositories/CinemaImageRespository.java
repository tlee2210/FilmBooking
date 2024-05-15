package com.cinemas.repositories;

import com.cinemas.entities.CinemaImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CinemaImageRespository extends JpaRepository<CinemaImages, Integer> {
    List<CinemaImages> findCinemaImagesByCinema_Id(Integer id);
}
