package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeShowtimeResponse {
    private LocalDate date;

    private List<MovieAndShowtimeResponse> movieList;
}
