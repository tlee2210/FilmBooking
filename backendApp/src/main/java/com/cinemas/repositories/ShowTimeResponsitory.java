package com.cinemas.repositories;

import com.cinemas.entities.Showtimes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowTimeResponsitory extends JpaRepository<Showtimes, Integer> {

}
