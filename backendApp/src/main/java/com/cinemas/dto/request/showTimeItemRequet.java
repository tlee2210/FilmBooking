package com.cinemas.dto.request;

import com.cinemas.enums.MovieFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class showTimeItemRequet {
    private Integer id;
    private Integer movieId;
    private Integer cinemaId;
    private Integer roomId;
    private LocalDate days;
    private LocalTime times;
    private MovieFormat movieFormat;
}
