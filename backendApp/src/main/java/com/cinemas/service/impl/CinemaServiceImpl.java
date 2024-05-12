package com.cinemas.service.impl;

import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.entities.Cinema;
import com.cinemas.repositories.CinemaRepository;
import com.cinemas.service.CinemaService;
import com.cinemas.service.admin.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CinemaServiceImpl implements CinemaService {
    @Autowired
    private CinemaRepository cinemaRepository;

    @Autowired
    private CityService cityService;

    @Override
    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    @Override
    public Cinema getCinemaById(int id) {
        return cinemaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid id"));
    }

    @Override
    public void addCinema(CinemaRequest cinema) {
        Cinema cinemaEntity = new Cinema();
        cinemaEntity.setCinemaAddress(cinema.getCinemaAddress());
        cinemaEntity.setCinemaName(cinema.getCinemaName());
        cinemaEntity.setHotline(cinema.getHotline());
        cinemaEntity.setInformation(cinema.getInformation());
        cinemaEntity.setHotline(cinema.getHotline());
//        cinemaEntity.setCity(cityService.getCity(cinema.getCity_id()));
        cinemaRepository.save(cinemaEntity);
    }

    @Override
    public void updateCinema(int id, CinemaRequest cinema) {
        Cinema existingCinema = getCinemaById(id);
        if (existingCinema != null) {
            existingCinema.setCinemaAddress(cinema.getCinemaAddress());
            existingCinema.setCinemaName(cinema.getCinemaName());
            existingCinema.setHotline(cinema.getHotline());
            existingCinema.setInformation(cinema.getInformation());
//            existingCinema.setCity(cityService.getCity(cinema.getCity_id()));
            cinemaRepository.save(existingCinema);
        }
    }

    @Override
    public void deleteCinema(int id) {
        Cinema existingCinema = getCinemaById(id);
        if (existingCinema != null) {
            cinemaRepository.delete(existingCinema);
        }
    }
}
