package com.cinemas;

import com.cinemas.initializer.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendAppApplication implements CommandLineRunner {

    @Autowired
    UserDataInitializer userDataInitializer;
    @Autowired
    CountryDataInitializer countryDataInitializer;
    @Autowired
    MovieGenreDataInitializer movieGenreDataInitializer;
    @Autowired
    CelebrityDataInitializer celebrityDataInitializer;

    public static void main(String[] args) {
        SpringApplication.run(BackendAppApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        userDataInitializer.initUsers();
//        countryDataInitializer.initCountries();
//        movieGenreDataInitializer.initMovieGenre();
//        celebrityDataInitializer.initCelebrities();
    }
}
