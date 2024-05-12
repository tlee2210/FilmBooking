package com.cinemas.service.admin;

import com.cinemas.dto.request.CityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.CityResponse;
import com.cinemas.entities.City;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CityService {
    Page<CityResponse> getCitiesAll(PaginationHelper PaginationHelper);
    CityResponse getCity(int id);
    boolean addCity(CityRequest city);
    boolean updateCity(CityRequest city);
    boolean deleteCity(int id);
}
