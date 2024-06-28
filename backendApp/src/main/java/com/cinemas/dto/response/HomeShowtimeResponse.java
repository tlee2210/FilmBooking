package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class HomeShowtimeResponse {
    private LocalDate date;
    private List<MovieAndShowtimeResponse> movieList;

    public HomeShowtimeResponse(LocalDate date) {
        this.date = date;
    }
}
