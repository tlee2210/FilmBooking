package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.response.HomeCinemaResponse;
import com.cinemas.dto.response.HomeShowtimeResponse;
import com.cinemas.dto.response.MovieAndShowtimeResponse;
import com.cinemas.dto.response.SelectOptionReponse;
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
    public HomeCinemaResponse getCinemaBySlug(String slug, String city, String _cinema) {
        Cinema cinema = cinemaRespository.findCinemaBySlug(slug);

        cinema.getImages().forEach(cinemaImages ->
                cinemaImages.setUrl(fileStorageServiceImpl.getUrlFromPublicId(cinemaImages.getUrl())));

        HomeCinemaResponse homeCinemaResponse = new HomeCinemaResponse();
        ObjectUtils.copyFields(cinema, homeCinemaResponse);
        
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

        List<String> cityList = cinemaRespository.findByCity();

        List<SelectOptionReponse> options = new ArrayList<>();
        cityList.forEach(item -> {
            options.add(new SelectOptionReponse(item, item));
        });

        homeCinemaResponse.setCityList(options);
        homeCinemaResponse.setCinema(cinemaRespository.selectCinema(city));

        return homeCinemaResponse;
    }
}
