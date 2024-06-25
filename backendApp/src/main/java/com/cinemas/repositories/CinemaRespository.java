package com.cinemas.repositories;

import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Cinema;
import com.cinemas.enums.StatusCinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CinemaRespository extends JpaRepository<Cinema, Integer> {
    Cinema findCinemaBySlug(String slug);

    Cinema findCinemaByName(String name);

    @Query("SELECT c FROM Cinema c WHERE c.name = ?1 AND c.id != ?2")
    Cinema findByNameWithId(String name, Integer id);

    @Query("SELECT DISTINCT c.city FROM Cinema AS c")
    List<String> findByCity();

    @Query("SELECT c FROM Cinema AS c " +
            "WHERE (:name is null or c.name LIKE %:name%) " +
            "AND (:status is null or c.status = :status) " +
            "AND (:city is null  or c.city = :city)")
    List<Cinema> searchCinema(
            @Param("name") String name,
            @Param("status") StatusCinema status,
            @Param("city") String city
    );

    @Query("SELECT new com.cinemas.dto.response.SelectOptionReponse(c.slug, c.name)  FROM Cinema AS c " +
            "WHERE (:city is null  or c.city = :city)")
    List<SelectOptionReponse<?>> selectCinema(
           String city
    );
}
