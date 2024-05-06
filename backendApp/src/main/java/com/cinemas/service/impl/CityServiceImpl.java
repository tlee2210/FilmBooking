package com.cinemas.service.impl;

import com.cinemas.dto.request.CityRequest;
import com.cinemas.entities.City;
import com.cinemas.repositories.CityRepository;
import com.cinemas.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public List<City> getCities() {
        return cityRepository.findAll();
    }

    @Override
    public City getCity(int id) {
        return cityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid id"));
    }

    @Override
    public void addCity(CityRequest city) {
        City cityEntity = new City();
        cityEntity.setCityName(city.getCityName());
        cityRepository.save(cityEntity);
    }

    @Override
    public void updateCity(int id, CityRequest city) {
        City cityEntity = getCity(id);
        cityEntity.setCityName(city.getCityName());
        cityRepository.save(cityEntity);
    }

    @Override
    public void deleteCity(int id) {
        City city = getCity(id);
        if (city != null) {
            cityRepository.delete(city);
        }
    }
}
