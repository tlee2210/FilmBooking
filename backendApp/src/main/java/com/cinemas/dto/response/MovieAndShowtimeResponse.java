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

    private String rules;

    private Integer duration_movie;

    private LocalDate releaseDate;

    private List<HomeMovieFormatResponse> movieFormats;

//    public MovieAndShowtimeResponse(String name, String imagePortrait) {
//        this.name = name;
//        this.imagePortrait = imagePortrait;
//    }

    public MovieAndShowtimeResponse(String name, String imagePortrait, String rules, Integer duration_movie, LocalDate releaseDate) {
        this.name = name;
        this.imagePortrait = imagePortrait;
        this.rules = rules;
        this.duration_movie = duration_movie;
        this.releaseDate = releaseDate;
    }
}
