package com.cinemas.service.home;

import com.cinemas.dto.response.HomeCinemaResponse;
import com.cinemas.entities.Cinema;

public interface HomeCinemaService {
    HomeCinemaResponse getCinemaBySlug(String slug);
}
