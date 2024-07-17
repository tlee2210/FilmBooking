package com.cinemas.repositories;

import com.cinemas.dto.response.*;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.entities.PriceMovie;
import com.cinemas.entities.Showtimes;
import com.cinemas.enums.MovieFormat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ShowTimeResponsitory extends JpaRepository<Showtimes, Integer> {
    @Query(value = "SELECT t.*, m.duration_movie FROM Showtimes t JOIN Movie m ON t.movie_id = m.id WHERE t.room_id = ?1 AND t.date = ?2 AND (t.time < ?4 AND ADDTIME(t.time, SEC_TO_TIME(m.duration_movie * 60)) > ?3)", nativeQuery = true)
    List<Showtimes> findOverlappingShowtimes(Integer roomId, LocalDate date, LocalTime startTime, LocalTime endTime);

    @Query(value = "SELECT t.*, m.duration_movie FROM Showtimes t JOIN Movie m ON t.movie_id = m.id WHERE " + "t.room_id = ?1 AND t.date = ?2 AND (t.time < ?4 AND ADDTIME(t.time, SEC_TO_TIME(m.duration_movie * 60)) > ?3 AND t.id != ?5)", nativeQuery = true)
    List<Showtimes> findOverlappingShowtimesUpdate(Integer roomId, LocalDate date, LocalTime startTime, LocalTime endTime, Integer id);

    @Query("SELECT new com.cinemas.dto.response.ShowTimeTableResponse(t.id, t.date, t.time, t.cinema.name, t.movie.name, t.room.name, t.movieFormat) FROM Showtimes t WHERE (:startDay IS NULL OR t.date >= :startDay) AND (:endDay IS NULL OR t.date <= :endDay) AND (:slug IS NULL OR t.cinema.slug = :slug) ORDER BY t.id DESC")
    List<ShowTimeTableResponse> searchAllByCinemaAndDate(String slug, LocalDate startDay, LocalDate endDay);

    @Query("SELECT s.date FROM Showtimes s WHERE s.cinema.slug = :slugCinema AND (:slugMovie IS NULL OR s.movie.slug = :slugMovie) AND s.date >= CURDATE() GROUP BY s.date")
    List<LocalDate> findDates(String slugCinema, String slugMovie);

    @Query("SELECT DISTINCT new com.cinemas.dto.response.HomeShowtimeResponse(s.date) FROM Showtimes s " + "WHERE s.cinema.slug = :slug " + "AND (s.date <> CURRENT_DATE OR s.time >= :timeNow) ORDER BY s.date ASC LIMIT 7")
    List<HomeShowtimeResponse> getDates(String slug, LocalTime timeNow);

    @Query("SELECT DISTINCT NEW com.cinemas.dto.response.bookingShowTimeResponse(s.date) FROM Showtimes s WHERE " + "(:cinema_Slug IS NULL OR s.cinema.slug = :cinema_Slug)" + "AND s.movie.slug = :slug_movie " + "AND s.date >= CURRENT_DATE " + "ORDER BY s.date ASC LIMIT 7")
    List<bookingShowTimeResponse> findDayByMovie_Slug(String slug_movie, String cinema_Slug);

    @Query("SELECT DISTINCT NEW com.cinemas.dto.response.CinemaTimeMovie(s.cinema.name) " + "FROM Showtimes s " + "WHERE (:slug IS NULL OR s.movie.slug = :slug) " + "AND (:cinema_Slug IS NULL OR s.cinema.slug = :cinema_Slug) " + "AND s.date = :day " + "AND (s.date <> CURRENT_DATE OR s.time >= :time)")
    List<CinemaTimeMovie> findByDayAndMovie_Slug(LocalDate day, String slug, LocalTime time, String cinema_Slug);

    @Query("SELECT DISTINCT s.movieFormat " + "FROM Showtimes s " + "WHERE (:slug IS NULL OR s.movie.slug = :slug) " + "AND (:cinema_name IS NULL OR s.cinema.name = :cinema_name) " + "AND s.date = :day " + "AND (s.date <> CURRENT_DATE OR s.time >= :time)")
    List<MovieFormat> findMovieFormat(LocalDate day, String slug, LocalTime time, String cinema_name);

    @Query("SELECT new com.cinemas.dto.response.HomeTimeAndRoomResponse(s.id,s.time ) FROM Showtimes s " +
            "WHERE s.movie.slug = :slug " +
            "AND s.cinema.name = :name " +
            "AND s.date = :day AND " +
            "s.movieFormat = :movieFormat " +
            "AND (s.date <> CURRENT_DATE OR s.time >= :time)")
    List<HomeTimeAndRoomResponse> findMovieTimes(LocalDate day, String slug, LocalTime time, String name, MovieFormat movieFormat);

    @Query("SELECT s.cinema FROM Showtimes s WHERE s.movie.slug = :slug GROUP BY s.cinema")
    List<Cinema> findCinemasByMovieSlug(String slug);

    @Query("SELECT new com.cinemas.dto.response.HomeTimeAndRoomResponse(s.id, s.time) FROM Showtimes s " + "WHERE (:slugMovie IS NULL OR s.movie.slug = :slugMovie) " + "AND (:slugCinema IS NULL OR s.cinema.slug = :slugCinema)" + "AND s.date = :date AND " + "(s.date <> CURRENT_DATE OR s.time >= :time) AND s.movieFormat = :nameFormat")
    List<HomeTimeAndRoomResponse> getTimes(String slugMovie, String slugCinema, LocalDate date, LocalTime time, MovieFormat nameFormat);

    @Query("SELECT DISTINCT s.movieFormat FROM Showtimes s " + "WHERE s.movie.slug = :slugMovie " + "AND s.cinema.slug = :slugCinema " + "AND s.date = :date AND " + "(s.date <> CURRENT_DATE OR s.time >= :time)")
    List<MovieFormat> getMovieFormatName(String slugMovie, String slugCinema, LocalDate date, LocalTime time);

    @Query("SELECT DISTINCT new com.cinemas.dto.response.MovieAndShowtimeResponse(s.movie.name, s.movie.imagePortrait) FROM Showtimes s " + "WHERE s.cinema.slug = :slug " + "AND s.date = :date AND (s.date <> CURRENT_DATE OR s.time >= :timeNow)")
    List<MovieAndShowtimeResponse> findMovieOfDay(String slug, LocalTime timeNow, LocalDate date);

    @Query("SELECT new com.cinemas.dto.response.HomeTimeAndRoomResponse(s.id,s.time ) FROM Showtimes s WHERE s.movie.name = :name AND s.cinema.slug = :slug AND s.date = :date AND s.movieFormat = :movieFormat AND (s.date <> CURRENT_DATE OR s.time >= :timeNow)")
    List<HomeTimeAndRoomResponse> findMovieTimesForNameCinema(LocalDate date, String name, LocalTime timeNow, String slug, MovieFormat movieFormat);

    @Query("SELECT DISTINCT s.movieFormat FROM Showtimes s WHERE s.movie.name = :name AND s.cinema.slug = :slug AND s.date = :date AND (s.date <> CURRENT_DATE OR s.time >= :timeNow)")
    List<MovieFormat> findMovieFormatForNameCinema(LocalDate date, String name, LocalTime timeNow, String slug);

    @Query("SELECT new com.cinemas.dto.response.ShowTimeTableResponse(s.id, s.date, s.time, s.movie.rules,s.cinema.name, s.movie.name ,s.room.name, s.movie.imagePortrait, s.movie.price, s.room, s.movieFormat) FROM Showtimes s WHERE s.id = :id")
    ShowTimeTableResponse getBookingTime(Integer id);

    @Query("SELECT new com.cinemas.dto.response.HomeTimeAndRoomResponse(s.id,s.time ) FROM Showtimes s "
            + "WHERE s.cinema.name = :cinemaName " + "AND s.date = :date AND " +
            "s.movie.name = :movieName AND s.movieFormat = :movieFormat "
            + "AND (s.date <> CURRENT_DATE OR s.time >= :timeNow)")
    List<HomeTimeAndRoomResponse> findshowtimes(LocalDate date, LocalTime timeNow, String movieName, String cinemaName, MovieFormat movieFormat);

    @Query("SELECT DISTINCT s.movieFormat FROM Showtimes s "
            + "WHERE s.cinema.name = :cinemaName " + "AND s.date = :date AND " +
            "s.movie.name = :movieName "
            + "AND (s.date <> CURRENT_DATE OR s.time >= :timeNow)")
    List<MovieFormat> findMovieFormat(LocalDate date, LocalTime timeNow, String movieName, String cinemaName);
}
