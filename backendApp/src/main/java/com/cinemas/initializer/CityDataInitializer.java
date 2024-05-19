package com.cinemas.initializer;

import com.cinemas.entities.City;
import com.cinemas.repositories.CinemaImageRespository;
import com.cinemas.repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CityDataInitializer {
    @Autowired
    CityRepository cityRepository;

    public void initCity() {
        String[] cityNames = {
                "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
                "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
                "Austin", "Jacksonville", "Fort Worth", "Columbus", "San Francisco",
                "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington D.C."};

        List<City> cities = new ArrayList<>();

        for (String cityName : cityNames) {
            City city = City.builder()
                    .name(cityName)
                    .slug(generateSlug(cityName))
                    .build();
            cities.add(city);
        }
        cityRepository.saveAll(cities);
    }

    private String generateSlug(String cityName) {
        return cityName.toLowerCase().replace(" ", "-");
    }
}
