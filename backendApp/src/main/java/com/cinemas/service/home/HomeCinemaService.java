package com.cinemas.service.home;

import com.cinemas.dto.response.CinemasResponse;
import com.cinemas.dto.response.HomeCinemaResponse;
import com.cinemas.entities.Cinema;

import java.util.List;

public interface HomeCinemaService {
    HomeCinemaResponse getCinemaBySlug(String slug, String city);
    CinemasResponse getAllCinema(String city);
}
