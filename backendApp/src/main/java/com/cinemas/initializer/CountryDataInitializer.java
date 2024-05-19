package com.cinemas.initializer;

import com.cinemas.entities.Country;
import com.cinemas.repositories.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CountryDataInitializer {
    @Autowired
    CountryRepository countryRepository;

    public void initCountries() {
        String[] nationalities = {
                "American", "British", "Canadian", "Australian",
                "French", "German", "Italian", "Spanish", "Japanese",
                "Chinese", "Russian", "Brazilian", "Indian", "Mexican",
                "South Korean", "Swedish", "Dutch", "Norwegian", "Swiss", "Greek"};

        List<Country> countries = new ArrayList<>();
        for (String nationality : nationalities) {
            Country country = Country.builder()
                    .name(nationality)
                    .build();
            countries.add(country);
        }

        countryRepository.saveAll(countries);
    }
}
