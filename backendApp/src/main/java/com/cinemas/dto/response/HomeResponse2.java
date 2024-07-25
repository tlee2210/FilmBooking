package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeResponse2 {
    List<Movie> movieShowingList;
    List<Movie> movieSoonList;
}
