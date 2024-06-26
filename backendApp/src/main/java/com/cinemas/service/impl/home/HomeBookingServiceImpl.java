package com.cinemas.service.impl.home;

import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.dto.response.ShowTimeTableResponse;
import com.cinemas.dto.response.bookTicketsResponse;
import com.cinemas.dto.response.bookingShowTimeResponse;
import com.cinemas.entities.Showtimes;
import com.cinemas.entities.PriceMovie;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.PriceMovieResponsetory;
import com.cinemas.repositories.ShowTimeResponsitory;
import com.cinemas.service.home.HomeBookingService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class HomeBookingServiceImpl implements HomeBookingService {
    @Autowired
    private CinemaRespository cinemaRespository;

    @Autowired
    private ShowTimeResponsitory showTimeResponsitory;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;
    @Autowired
    PriceMovieResponsetory priceMovieResponsetory;

    @Override
    public bookTicketsResponse getTimeForMovie(String slug, String city, String cinema) {
        List<String> cityList = cinemaRespository.findByCity();
        List<bookingShowTimeResponse> showtimes = showTimeResponsitory.findDayByMovie_Slug(slug, cinema);
        LocalTime currentTimePlus15 = LocalTime.now().plusMinutes(15);

        showtimes.forEach(item -> {

            item.setCinemaTimeMovies(showTimeResponsitory.findByDayAndMovie_Slug(item.getDay(), slug, currentTimePlus15, cinema));
        });

        showtimes.forEach(item -> {
            item.getCinemaTimeMovies().forEach(timeMovies -> {

                timeMovies.setTimes(showTimeResponsitory.findMovieTimes(item.getDay(), slug, currentTimePlus15, timeMovies.getName()));
            });
        });

        List<SelectOptionReponse> options = new ArrayList<>();
        cityList.forEach(item -> {
            options.add(new SelectOptionReponse(item, item));
        });


        bookTicketsResponse bookTicketsResponse = new bookTicketsResponse();

        bookTicketsResponse.setCity(options);
        bookTicketsResponse.setCinema(cinemaRespository.selectCinema(city));
        bookTicketsResponse.setBookingShowTimeResponses(showtimes);

        return bookTicketsResponse;
    }

    @Override
    public ShowTimeTableResponse getBookingTime(Integer id) {
        ShowTimeTableResponse response = showTimeResponsitory.getBookingTime(id);
        response.setImage(fileStorageServiceImpl.getUrlFromPublicId(response.getImage()));
        PriceMovie priceMovie = priceMovieResponsetory.findPriceMovie(response.getMovieName(), response.getDate());

        if(priceMovie != null){
            response.setPrice(priceMovie.getPrice());
        }
        LocalTime timeNow = LocalTime.now().plusMinutes(15);

        response.setShowtimes(showTimeResponsitory.findshowtimes(response.getDate(), timeNow, response.getMovieName(), response.getCinemaName()));

        return response;
    }

}
