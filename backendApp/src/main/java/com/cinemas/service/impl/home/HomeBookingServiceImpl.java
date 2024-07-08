package com.cinemas.service.impl.home;

import com.cinemas.dto.response.*;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.entities.Showtimes;
import com.cinemas.entities.PriceMovie;
import com.cinemas.enums.MovieFormat;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.repositories.PriceMovieResponsetory;
import com.cinemas.repositories.ShowTimeResponsitory;
import com.cinemas.service.home.HomeBookingService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public bookTicketsResponse getTimeForMovie(String slug, String city, String cinema) {
        List<String> cityList = cinemaRespository.findByCity();
        List<bookingShowTimeResponse> showtimes = showTimeResponsitory.findDayByMovie_Slug(slug, cinema);
        LocalTime currentTimePlus15 = LocalTime.now().plusMinutes(15);

        List<MovieFormat> listMovieFormat = new ArrayList<>();

        showtimes.forEach(item -> {
            item.setCinemaTimeMovies(showTimeResponsitory.findByDayAndMovie_Slug(item.getDay(), slug, currentTimePlus15, cinema));
            listMovieFormat.addAll(showTimeResponsitory.findMovieFormat(item.getDay(), slug, currentTimePlus15, cinema));
        });

        showtimes.forEach(item -> {
            item.getCinemaTimeMovies().forEach(timeMovies -> {
                List<HomeMovieFormatResponse> homeMovieFormatResponses = new ArrayList<>();

                listMovieFormat.forEach(name -> {
                    HomeMovieFormatResponse homeMovieFormatResponse = new HomeMovieFormatResponse();
                    homeMovieFormatResponse.setName(name.getValue());
                    homeMovieFormatResponse.setTimes(showTimeResponsitory.findMovieTimes(item.getDay(), slug, currentTimePlus15, timeMovies.getName(), name));

                    homeMovieFormatResponses.add(homeMovieFormatResponse);
                });

                timeMovies.setMovieFormat(homeMovieFormatResponses);
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

        if (priceMovie != null) {
            response.setPrice(priceMovie.getPrice());
        }
        LocalTime timeNow = LocalTime.now().plusMinutes(15);
        List<HomeMovieFormatResponse> homeMovieFormatResponses = new ArrayList<>();
        List<MovieFormat> listMovieFormat = showTimeResponsitory.findMovieFormat(response.getDate(), timeNow, response.getMovieName(), response.getCinemaName());
        listMovieFormat.forEach(item -> {
            HomeMovieFormatResponse homeMovieFormatResponse = new HomeMovieFormatResponse();
            homeMovieFormatResponse.setName(item.getValue());
            homeMovieFormatResponse.setTimes(showTimeResponsitory.findshowtimes(response.getDate(), timeNow, response.getMovieName(), response.getCinemaName(), item));

            homeMovieFormatResponses.add(homeMovieFormatResponse);
        });

        response.setMovieformats(homeMovieFormatResponses);

        return response;
    }

    @Override
    public BuyTicketResponse getInfoTicket(String slugmovie, String slugcinema, LocalDate date) {
        List<Movie> movies = movieRepository.getListBySlug();

        BuyTicketResponse buyTicketFast = new BuyTicketResponse();

        List<SelectOptionReponse> movieList = new ArrayList<>();
        movies.forEach(movie -> {
            movieList.add(new SelectOptionReponse<>(movie.getSlug(), movie.getName()));
        });
        buyTicketFast.setMovieList(movieList);

        List<SelectOptionReponse> cinemaList = new ArrayList<>();
        List<Cinema> cinemas = showTimeResponsitory.findCinemasByMovieSlug(slugmovie);

        cinemas.forEach(cinema -> {
            cinemaList.add(new SelectOptionReponse<>(cinema.getSlug(), cinema.getName()));
        });
        buyTicketFast.setCinemaList(cinemaList);

        buyTicketFast.setDateList(showTimeResponsitory.findDates(slugcinema, slugmovie));

        List<HomeMovieFormatResponse> movieFormatList = new ArrayList<>();
        List<MovieFormat> movieFormatName = showTimeResponsitory.getMovieFormatName(slugmovie, slugcinema, date, LocalTime.now().plusMinutes(15));
        movieFormatName.forEach(item -> {
            HomeMovieFormatResponse homeMovieFormatResponse = new HomeMovieFormatResponse();
            homeMovieFormatResponse.setName(item.getValue());
            homeMovieFormatResponse.setTimes(showTimeResponsitory.getTimes(slugmovie, slugcinema, date, LocalTime.now().plusMinutes(15), item));
            movieFormatList.add(homeMovieFormatResponse);
        });
        buyTicketFast.setMovieFormat(movieFormatList);

        return buyTicketFast;
    }

}
