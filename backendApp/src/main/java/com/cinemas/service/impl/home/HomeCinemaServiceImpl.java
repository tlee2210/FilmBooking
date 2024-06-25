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

        List<LocalDate> dates = showTimeResponsitory.getDates(slug);
        List<MovieAndShowtimeResponse> movieWithShowtimeResponses = new ArrayList<>();
        LocalDate dateNow = LocalDate.now();
        LocalTime timeNow = LocalTime.now().plusMinutes(15);

        dates.forEach(date -> {
            List<Movie> movies = showTimeResponsitory.getMovies(slug, date);
            movies.forEach(movie -> {
                MovieAndShowtimeResponse movieWithShowtime = new MovieAndShowtimeResponse();
                ObjectUtils.copyFields(movie, movieWithShowtime);

                List<Showtimes> showtimes;
                if (date.isEqual(dateNow)) {
                    showtimes = showTimeResponsitory.getShowtime(slug, date, timeNow, movie.getId());
                } else if (date.isAfter(dateNow)) {
                    showtimes = showTimeResponsitory.getShowtime2(slug, date, movie.getId());
                }
                else{
                    showtimes = null;
                }

                List<LocalTime> localTimeList = new ArrayList<>();
                showtimes.forEach(show -> localTimeList.add(show.getTime()));
                movieWithShowtime.setTimes(localTimeList);

                movieWithShowtime.setDates(date);
                movieWithShowtimeResponses.add(movieWithShowtime);
            });
        });

        List<HomeShowtimeResponse> homeShowtimeResponseList = new ArrayList<>();
        dates.forEach(date -> {
            HomeShowtimeResponse homeShowtimeResponse = new HomeShowtimeResponse();
            homeShowtimeResponse.setDate(date);

            List<MovieAndShowtimeResponse> movieList = new ArrayList<>();
            movieWithShowtimeResponses.forEach(movieWithShowtimeResponse -> {
                if(movieWithShowtimeResponse.getDates().equals(date)){
                    movieList.add(movieWithShowtimeResponse);
                }
            });
            homeShowtimeResponse.setMovieList(movieList);
            homeShowtimeResponseList.add(homeShowtimeResponse);
        });

        homeCinemaResponse.setShowtimes(homeShowtimeResponseList);
        return homeCinemaResponse;
    }
}
