package com.cinemas.service;

import com.cinemas.dto.request.CityRequest;
import com.cinemas.entities.City;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CityService {
    List<City> getCities();
    City getCity(int id);
    void addCity(CityRequest city);
    void updateCity(int id, CityRequest city);
    void deleteCity(int id);
}
