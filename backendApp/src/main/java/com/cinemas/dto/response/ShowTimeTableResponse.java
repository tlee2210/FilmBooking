package com.cinemas.dto.response;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ShowTimeTableResponse {
    private Integer id;
    private LocalDate date;
    private LocalTime time;
    private String cinemaName;
    private String movieName;
    private String roomName;
}
