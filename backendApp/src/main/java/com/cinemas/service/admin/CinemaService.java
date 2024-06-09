package com.cinemas.service.admin;

import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.cinemaSearchRequest;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Cinema;
import org.springframework.data.domain.Page;

import java.io.IOException;

public interface CinemaService {
    boolean createCinema(CinemaRequest cinemaRequest) throws IOException;

    SelectOptionAndModelReponse<Page<Cinema>> getAllCinema(cinemaSearchRequest PaginationHelper);

    Integer deleteCinema(String slug) throws IOException;

    Cinema getCinemaEdit(String slug);

    boolean updateCinema(CinemaRequest cinemaRequest) throws IOException;

    Cinema findCinemaById(Integer id);
}
