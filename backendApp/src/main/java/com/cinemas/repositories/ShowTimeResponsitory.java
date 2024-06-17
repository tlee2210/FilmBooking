package com.cinemas.repositories;

import com.cinemas.entities.Cinema;
import com.cinemas.entities.Room;
import com.cinemas.entities.Showtimes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ShowTimeResponsitory extends JpaRepository<Showtimes, Integer> {
    //    @Query(value = "SELECT * FROM Showtimes t WHERE t.room_id = ?1 AND t.date = ?2 AND (t.time < ?4 AND ADDTIME(t.time, SEC_TO_TIME(t.movie.duration_movie * 60)) > ?3)", nativeQuery = true)
    @Query(value = "SELECT t.*, m.duration_movie FROM Showtimes t JOIN Movie m ON t.movie_id = m.id WHERE t.room_id = ?1 AND t.date = ?2 AND (t.time < ?4 AND ADDTIME(t.time, SEC_TO_TIME(m.duration_movie * 60)) > ?3)", nativeQuery = true)
    List<Showtimes> findOverlappingShowtimes(Integer roomId, LocalDate date, LocalTime startTime, LocalTime endTime);

    @Query(value = "SELECT t.*, m.duration_movie FROM Showtimes t JOIN Movie m ON t.movie_id = m.id WHERE " +
            "t.room_id = ?1 AND t.date = ?2 AND (t.time < ?4 AND ADDTIME(t.time, SEC_TO_TIME(m.duration_movie * 60)) > ?3 AND t.id != ?5)", nativeQuery = true)
    List<Showtimes> findOverlappingShowtimesUpdate(Integer roomId, LocalDate date, LocalTime startTime, LocalTime endTime, Integer id);

    //    @Query("SELECT t FROM Showtimes t WHERE (:slug IS NULL OR t.cinema.slug = :slug) " +
//            "AND (:startDay IS NULL OR :endDay IS NULL OR t.date BETWEEN :startDay AND :endDay)")
    @Query("SELECT t FROM Showtimes t WHERE" +
            "(:startDay IS NULL OR t.date >= :startDay)" +
            "AND (:endDay IS NULL OR t.date <= :endDay)" +
            "AND (:slug IS NULL OR t.cinema.slug = :slug)")
    List<Showtimes> searchAllByCinemaAndDate(String slug, LocalDate startDay, LocalDate endDay);

}
