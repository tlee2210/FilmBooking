package com.cinemas.dto.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingTableResponse {
    private Integer id;

    private String userName;

    private String movieName;

    private String cinemaName;

    private String roomName;

    private String quantitySeat;

    private String quantityDoubleSeat;

    private LocalTime showtime;

    private LocalDate date;

    public BookingTableResponse(Integer id, String userName, String movieName, String cinemaName, String roomName, String quantitySeat, String quantityDoubleSeat, LocalTime showtime, LocalDate date) {
        this.id = id;
        this.userName = userName;
        this.movieName = movieName;
        this.cinemaName = cinemaName;
        this.roomName = roomName;
        this.quantitySeat = quantitySeat;
        this.quantityDoubleSeat = quantityDoubleSeat;
        this.showtime = showtime;
        this.date = date;
    }
}
