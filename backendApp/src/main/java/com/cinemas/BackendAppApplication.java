package com.cinemas;

import com.cinemas.initializer.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackendAppApplication implements CommandLineRunner {

    @Autowired
    UserDataInitializer userDataInitializer;
    @Autowired
    CountryDataInitializer countryDataInitializer;
    @Autowired
    MovieGenreDataInitializer movieGenreDataInitializer;
    @Autowired
    CelebrityDataInitializer celebrityDataInitializer;
    @Autowired
    CinemaDataInitializer cinemaDataInitializer;
    @Autowired
    ReviewDataInitializer reviewDataInitializer;
    @Autowired
    BlogDataInitializer blogDataInitializer;
    @Autowired
    RoomDataInitializer roomDataInitializer;
    public static void main(String[] args) {
        SpringApplication.run(BackendAppApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setFieldMatchingEnabled(true)
                .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        userDataInitializer.initUsers();
        countryDataInitializer.initCountries();
        movieGenreDataInitializer.initMovieGenre();
//        celebrityDataInitializer.initCelebrities();
//        cinemaDataInitializer.initCinemas();
//        reviewDataInitializer.initReviewData();
//        blogDataInitializer.initBlogData();
        roomDataInitializer.initRoomData();
    }
}
