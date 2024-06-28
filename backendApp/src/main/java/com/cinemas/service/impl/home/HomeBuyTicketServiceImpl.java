package com.cinemas.service.impl.home;

import com.cinemas.dto.response.BuyTicketResponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.repositories.ShowTimeResponsitory;
import com.cinemas.service.home.HomeBuyTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class HomeBuyTicketServiceImpl implements HomeBuyTicketService {
    @Autowired
    private ShowTimeResponsitory showTimeResponsitory;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CinemaRespository cinemaRepository;

    @Override
    public BuyTicketResponse getInfoTicket(String slugmovie, String slugcinema, LocalDate date) {
        List<Movie> movies = movieRepository.getListBySlug(slugmovie);

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

        buyTicketFast.setDateList(showTimeResponsitory.getDates(slugcinema, slugmovie));

        buyTicketFast.setTimeList(showTimeResponsitory.getTimes(slugmovie, slugcinema, date, LocalTime.now().plusMinutes(15)));

        return buyTicketFast;
    }
}
