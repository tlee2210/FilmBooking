package com.cinemas.service.impl.home;

import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Cinema;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.service.home.HomeBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HomeBookingServiceImpl implements HomeBookingService {
    @Autowired
    private CinemaRespository cinemaRespository;

    @Override
    public Object getTimeForMovie(String slug, String city) {

        List<String> cityList = cinemaRespository.findByCity();

        List<SelectOptionReponse> options = new ArrayList<>();
        cityList.forEach(item -> {
            options.add(new SelectOptionReponse(item, item));
        });
        List<SelectOptionReponse<?>> selectOptionCinema = cinemaRespository.selectCinema(city);


        return selectOptionCinema;
    }
}
