package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.response.HomeCinemaResponse;
import com.cinemas.dto.response.HomeShowtimeResponse;
import com.cinemas.dto.response.MovieAndShowtimeResponse;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.entities.Showtimes;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.ShowTimeResponsitory;
import com.cinemas.service.home.HomeCinemaService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class HomeCinemaServiceImpl implements HomeCinemaService {
    @Autowired
    private CinemaRespository cinemaRespository;

    @Autowired
    private ShowTimeResponsitory showTimeResponsitory;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public HomeCinemaResponse getCinemaBySlug(String slug) {
        Cinema cinema = cinemaRespository.findCinemaBySlug(slug);

        cinema.getImages().forEach(cinemaImages ->
                cinemaImages.setUrl(fileStorageServiceImpl.getUrlFromPublicId(cinemaImages.getUrl())));

        HomeCinemaResponse homeCinemaResponse = new HomeCinemaResponse();
        ObjectUtils.copyFields(cinema, homeCinemaResponse);

//<<<<<<< Updated upstream
//        List<LocalDate> dates = showTimeResponsitory.getDates(slug, null);
//        List<MovieAndShowtimeResponse> movieWithShowtimeResponses = new ArrayList<>();
//        LocalDate dateNow = LocalDate.now();
//=======
//>>>>>>> Stashed changes
        LocalTime timeNow = LocalTime.now().plusMinutes(15);

        homeCinemaResponse.setDays(showTimeResponsitory.getDates(slug, timeNow));

        homeCinemaResponse.getDays().forEach(item -> {
            item.setMovieList(showTimeResponsitory.findMovieOfDay(slug, timeNow, item.getDate()));
        });

        homeCinemaResponse.getDays().forEach(day -> {
            day.getMovieList().forEach(movie -> {
                movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));

                movie.setTimes(showTimeResponsitory.findMovieTimesForNameCinema(day.getDate(), movie.getName(), timeNow, slug));
            });
        });

        return homeCinemaResponse;
    }
}
