package com.cinemas.repositories;

import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.dto.response.waterCornBookingResponse;
import com.cinemas.entities.BookingWaterCorn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingWaterRepository extends JpaRepository<BookingWaterCorn, Integer> {
    @Query("SELECT new com.cinemas.dto.request.BookingWaterRequest(w.id, w.quantity) FROM  BookingWaterCorn w WHERE w.id = :id")
    BookingWaterRequest findByIdConvertToBookingWaterRequestById(Integer id);

    @Query("SELECT new com.cinemas.dto.response.waterCornBookingResponse(w.id,w.waterCorn.name, w.quantity) FROM  BookingWaterCorn w WHERE w.booking.id = :id")
    List<waterCornBookingResponse> findByIdBooking(Integer id);
}
