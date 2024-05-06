package com.cinemas.service;

import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.entities.Cinema;

import java.util.List;

public interface CinemaService {
    List<Cinema> getAllCinemas();
    Cinema getCinemaById(int id);
    void addCinema(CinemaRequest cinema);
    void updateCinema(int id, CinemaRequest cinema);
    void deleteCinema(int id);
}
