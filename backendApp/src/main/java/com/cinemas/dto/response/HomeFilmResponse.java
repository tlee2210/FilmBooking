package com.cinemas.dto.response;

import com.cinemas.entities.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeFilmResponse {
    private Integer id;
    private String name;
    private String slug;
    private Integer duration_movie;
    private Country country;
    private String language;
    private String producer;
    private String description;
    private String imagePortrait;
    private String imageLandscape;
    private String trailer;
    private String rules;
    private String movieFormat;
    private List<MovieGenre> categories;
    private List<Celebrity> actor;
    private List<Celebrity> director;
    private LocalDate releaseDate;
    private List<imageDescription> images;
    private List<ItemIntroduce> reviews;
    private List<Review> Subplot;
    private List<Review> movieReview;
}
