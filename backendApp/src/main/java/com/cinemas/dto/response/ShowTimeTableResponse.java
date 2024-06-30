package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShowTimeTableResponse {
    private Integer id;
    private LocalDate date;
    private LocalTime time;
    private String cinemaName;
    private String movieName;
    private String roomName;
    private String image;
    private Movie movie;
    private float price;

    public ShowTimeTableResponse(Integer id, LocalDate date, LocalTime time, String cinemaName, String movieName, String roomName) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.cinemaName = cinemaName;
        this.movieName = movieName;
        this.roomName = roomName;
    }

    public ShowTimeTableResponse(Integer id, LocalDate date, LocalTime time, String cinemaName, String movieName, String roomName, String image, float price) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.cinemaName = cinemaName;
        this.movieName = movieName;
        this.roomName = roomName;
        this.image = image;
        this.price = price;
    }

}
