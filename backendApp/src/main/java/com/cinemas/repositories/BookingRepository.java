package com.cinemas.repositories;

import com.cinemas.entities.Booking;
import com.cinemas.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId ORDER BY b.createAt DESC LIMIT 20")
    List<Booking> findByUserId(Integer userId);
}
