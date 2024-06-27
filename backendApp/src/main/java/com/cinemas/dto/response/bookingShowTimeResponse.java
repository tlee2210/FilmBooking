package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class bookingShowTimeResponse {
    private LocalDate day;
    private List<CinemaTimeMovie> cinemaTimeMovies;

    public bookingShowTimeResponse(LocalDate day, List<CinemaTimeMovie> cinemaTimeMovies) {
        this.day = day;
        this.cinemaTimeMovies = cinemaTimeMovies;
    }

    public bookingShowTimeResponse(LocalDate day) {
        this.day = day;
    }
}
