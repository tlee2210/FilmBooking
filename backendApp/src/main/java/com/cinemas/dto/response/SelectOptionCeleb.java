package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SelectOptionCeleb<T> {
    private List<SelectOptionReponse> selectOptionCountry;
    private List<Movie> movieList;
    private T Model;

    public SelectOptionCeleb(T model, List<SelectOptionReponse> selectOptionCountry, List<Movie> movieList) {
        this.selectOptionCountry = selectOptionCountry;
        this.movieList = movieList;
        Model = model;
    }
}
