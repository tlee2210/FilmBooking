package com.cinemas.dto.response;

import com.cinemas.entities.Cinema;
import com.cinemas.entities.CinemaImages;
import com.cinemas.entities.Movie;
import com.cinemas.entities.Showtimes;
import com.cinemas.enums.StatusCinema;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeCinemaResponse {
    private Integer id;

    private String name;

    private String slug;

    private String address;

    private String phone;

    private String description;

    private String city;

    private String lat;

    private String lng;

    private StatusCinema status;

    private List<CinemaImages> images;

    private List<HomeShowtimeResponse> days;

    List<SelectOptionReponse> cityList;

    List<SelectOptionReponse<?>> cinema;
}
