package com.cinemas.dto.response;

import com.cinemas.entities.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MovieDetailsResponse {
    private Integer id;
    private String name;
    private String slug;
    private Integer duration_movie;
    private Country country;
    private String language;
    private String producer;
    private String description;
    private String imageLandscape;
    private String imagePortrait;
    private String trailer;
    private String rules;
    private String movieFormat;
    private Float price;
    private List<MovieGenre> categories;
    private List<Celebrity> actor;
    private List<Celebrity> director;
    private List<PriceMovie> priceMovies = new ArrayList<>();
    private List<Showtimes> showtimes = new ArrayList<>();
    private LocalDate releaseDate;
    private LocalDate endDate;
    
}
