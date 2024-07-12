package com.cinemas.repositories;

import com.cinemas.entities.BookingWaterCorn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingWaterRepository extends JpaRepository<BookingWaterCorn, Integer> {
}
