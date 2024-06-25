package com.cinemas.repositories;

import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.entities.Room;
import com.cinemas.entities.Showtimes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Query(value = "SELECT s FROM Showtimes s WHERE s.cinema.slug = :slug AND s.movie.id = :id AND s.date = :date AND s.time > :time GROUP BY s.time")
    List<Showtimes> getShowtime(String slug, LocalDate date, LocalTime time, Integer id);

    @Query(value = "SELECT s FROM Showtimes s WHERE s.cinema.slug = :slug AND s.movie.id = :id AND s.date = :date GROUP BY s.time")
    List<Showtimes> getShowtime2(String slug, LocalDate date, Integer id);

    @Query("SELECT m FROM Showtimes s JOIN Movie m ON m.id = s.movie.id WHERE s.cinema.slug = :slug AND s.date = :date GROUP BY s.movie.id")
    List<Movie> getMovies(String slug, LocalDate date);

    @Query("SELECT s.date FROM Showtimes s WHERE s.cinema.slug = :slug AND s.date >= CURDATE() GROUP BY s.date")
    List<LocalDate> getDates(String slug);
}
