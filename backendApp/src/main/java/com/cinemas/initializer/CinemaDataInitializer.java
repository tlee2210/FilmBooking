package com.cinemas.initializer;

import com.cinemas.entities.Cinema;
import com.cinemas.entities.CinemaImages;
import com.cinemas.enums.StatusCinema;
import com.cinemas.repositories.CinemaImageRespository;
import com.cinemas.repositories.CinemaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

@Component
public class CinemaDataInitializer {
    @Autowired
    CinemaRespository cinemaRespository;
    @Autowired
    CinemaImageRespository cinemaImageRespository;

    private static final List<String> CINEMA_NAMES = Arrays.asList(
            "AMC Empire 25",
            "Regal Cinemas",
            "Cinemark Theatres",
            "Alamo Drafthouse",
            "Arclight Cinemas",
            "Landmark Theatres",
            "Showcase Cinemas",
            "Harkins Theatres",
            "Marcus Theatres",
            "Megaplex Theatres",
            "Pacific Theatres",
            "Rave Cinemas",
            "United Artists Theatres",
            "Wehrenberg Theatres",
            "Cineworld",
            "Odeon Cinemas",
            "Vue Cinemas",
            "Pathé",
            "Gaumont",
            "UGC Ciné Cité",
            "Cinépolis",
            "Cinemex",
            "Hoyts",
            "Village Cinemas",
            "Event Cinemas",
            "Reading Cinemas",
            "Grand Cinemas",
            "Palace Cinemas",
            "Nova Cinemas",
            "Ritz Cinemas"
    );

    public void initCinemas() {
        if (cinemaRespository.count() == 0) {
            IntStream.range(0, CINEMA_NAMES.size()).forEach(i -> {
                Cinema cinema = new Cinema(
                        null,
                        CINEMA_NAMES.get(i),
                        "cinema-" + (i + 1),
                        "Address " + (i + 1),
                        "123-456-78" + String.format("%02d", (i + 1)),
                        "Description for " + CINEMA_NAMES.get(i),
                        "City " + (i + 1),
                        "40.71" + (i + 1),
                        "-74.00" + (i + 1),
                        StatusCinema.ACTIVE,
                        null,
                        null,
                        null
                );

                CinemaImages image = new CinemaImages(
                        null,
                        "http://example.com/image" + (i + 1) + ".jpg",
                        cinema
                );

                cinema.setImages(Arrays.asList(image));

                cinemaRespository.save(cinema);
                cinemaImageRespository.save(image);
            });
        }
    }
}
