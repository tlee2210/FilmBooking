package com.cinemas.repositories;

import com.cinemas.dto.response.BookingTableResponse;
import com.cinemas.entities.Booking;
import com.cinemas.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId ORDER BY b.createAt DESC LIMIT 20")
    List<Booking> findByUserId(Integer userId);

    @Query("SELECT new com.cinemas.dto.response.BookingTableResponse(b.id, b.user.name, b.showtime.movie.name, b.showtime.cinema.name, b.showtime.room.name, b.quantitySeat, b.quantityDoubleSeat, b.showtime.time, b.createAt) FROM Booking b WHERE (:userName IS NULL OR b.user.name LIKE %:userName%)" +
            " AND (:movieName IS NULL OR b.showtime.movie.name LIKE %:movieName%)" +
            " AND (:startDate IS NULL OR b.createAt >= :startDate)" +
            " AND (:endDate IS NULL OR b.createAt <= :endDate) ORDER BY b.id DESC")
    List<BookingTableResponse> findAllBookingTable(String userName, String movieName, LocalDate startDate, LocalDate endDate);

    @Query("SELECT b FROM Booking b WHERE b.showtime.id = :id")
    List<Booking> findByShowtimeId(Integer id);
}
