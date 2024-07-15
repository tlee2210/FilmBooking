package com.cinemas.repositories;

import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.entities.BookingWaterCorn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingWaterRepository extends JpaRepository<BookingWaterCorn, Integer> {
    @Query("SELECT new com.cinemas.dto.request.BookingWaterRequest(w.id, w.quantity) FROM  BookingWaterCorn w WHERE w.id = :id")
    BookingWaterRequest findByIdConvertToBookingWaterRequestById(Integer id);
}
