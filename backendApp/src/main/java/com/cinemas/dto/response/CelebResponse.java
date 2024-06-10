package com.cinemas.dto.response;

import com.cinemas.entities.Country;
import com.cinemas.entities.Movie;
import com.cinemas.enums.RoleCeleb;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CelebResponse {
    private Integer id;

    private String name;

    private LocalDate dateOfBirth;

    private String slug;

    private String biography;

    private String description;

    private RoleCeleb role;

    private String image;

    private Country country;

    private List<MovieCelebResponse> movieList;
}
