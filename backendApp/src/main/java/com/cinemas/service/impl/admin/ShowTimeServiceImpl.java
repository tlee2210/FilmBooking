package com.cinemas.service.impl.admin;

import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.dto.response.ShowTimeCreateResponse;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.Movie;
import com.cinemas.entities.Room;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.repositories.RoomRepository;
import com.cinemas.service.admin.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ShowTimeServiceImpl implements ShowTimeService {
    @Autowired
    CinemaRespository cinemaRespository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    MovieRepository movieRepository;

    @Override
    public ShowTimeCreateResponse getcreate() {
        List<Cinema> cinemaList = cinemaRespository.findAll();
        List<Movie> movieList = movieRepository.findAllMovieSetTime();
        List<SelectOptionReponse> optionsCinema = new ArrayList<>();
        List<SelectOptionReponse> optionsMovie = new ArrayList<>();

        cinemaList.forEach(cinema -> {
            optionsCinema.add(new SelectOptionReponse(cinema.getId(), cinema.getName()));
        });
        movieList.forEach(movie -> {
            optionsMovie.add(new SelectOptionReponse(movie.getId(), movie.getName()));
        });

        return new ShowTimeCreateResponse(optionsMovie, optionsCinema);
    }

    @Override
    public List<SelectOptionReponse> getRoomCreate(Integer idCinema) {
        List<SelectOptionReponse> optionsRoom = new ArrayList<>();
        List<Room> rooms = roomRepository.getRoomByCinemaId(idCinema);

        rooms.forEach(room -> {
            optionsRoom.add(new SelectOptionReponse(room.getId(), room.getName()));
        });

        return optionsRoom;
    }
}
