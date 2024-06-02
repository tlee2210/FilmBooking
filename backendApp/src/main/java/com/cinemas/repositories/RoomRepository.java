package com.cinemas.repositories;

import com.cinemas.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("SELECT r FROM Room r WHERE r.name = ?1 AND r.cinema.id = ?2")
    Room findByNameAndCinemaId(String name, Integer id);
    @Query("SELECT r FROM Room r WHERE r.name = ?1 AND r.id != ?3 AND r.cinema.id = ?2")
    Room findByNameAndIdAndCinemaId(String name, Integer id, Integer idRoom);
    @Query("SELECT r FROM Room r WHERE  (:name is null or r.name LIKE %:name%)" +
            "AND (:cinemaId is null or r.cinema.id = :cinemaId)")
    List<Room> searchByNameAndAndCinemaId(String name, Integer cinemaId);
}
