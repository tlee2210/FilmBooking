package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MovieAndShowtimeResponse {
    private String imagePortrait;

    private String name;

    private String slug;

    private List<LocalTime> times;

    private LocalDate dates;
}
