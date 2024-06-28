package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MovieAndShowtimeResponse {
    private String name;

    private String imagePortrait;

    private List<LocalTime> times;

    public MovieAndShowtimeResponse(String name, String imagePortrait) {
        this.name = name;
        this.imagePortrait = imagePortrait;
    }
}
