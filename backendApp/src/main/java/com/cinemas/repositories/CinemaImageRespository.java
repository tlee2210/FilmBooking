package com.cinemas.repositories;

import com.cinemas.entities.CinemaImages;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CinemaImageRespository extends JpaRepository<CinemaImages, Integer> {
//    @Query("SELECT I FROM CinemaImages I WHERE I.cinemaId = ?1")
    @Query("SELECT I FROM CinemaImages I WHERE I.cinema.id = ?1")
    List<CinemaImages> findCinemaImagesByCinema_Id(Integer id);

    @Transactional
    @Modifying
    @Query("DELETE FROM CinemaImages d WHERE d.uid = ?1")
    void deleteByUid(Integer uid);
}
