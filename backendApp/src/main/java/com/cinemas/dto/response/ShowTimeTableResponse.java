package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.cinemas.entities.Room;
import com.cinemas.enums.MovieFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShowTimeTableResponse {
    private Integer id;
    private LocalDate date;
    private LocalTime time;
    private String rules;
    private String cinemaName;
    private String movieName;
    private String roomName;
    private String image;
    private Movie movie;
    private float price;
    private Room room;
    private MovieFormat movieFormat;
    private List<HomeMovieFormatResponse> movieformats;

    public ShowTimeTableResponse(Integer id, LocalDate date, LocalTime time, String cinemaName, String movieName, String roomName, MovieFormat movieFormat) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.cinemaName = cinemaName;
        this.movieName = movieName;
        this.roomName = roomName;
        this.movieFormat = movieFormat;
    }

    public ShowTimeTableResponse(Integer id, LocalDate date, LocalTime time, String cinemaName, String movieName, String roomName, String image, float price, Room room, MovieFormat movieFormat) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.cinemaName = cinemaName;
        this.movieName = movieName;
        this.roomName = roomName;
        this.image = image;
        this.price = price;
        this.room = room;
        this.movieFormat = movieFormat;
    }

    public ShowTimeTableResponse(Integer id, LocalDate date, LocalTime time, String rules, String cinemaName, String movieName, String roomName, String image, float price, Room room, MovieFormat movieFormat) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.rules = rules;
        this.cinemaName = cinemaName;
        this.movieName = movieName;
        this.roomName = roomName;
        this.image = image;
        this.price = price;
        this.room = room;
        this.movieFormat = movieFormat;
    }
}
