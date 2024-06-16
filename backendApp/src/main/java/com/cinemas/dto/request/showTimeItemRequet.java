package com.cinemas.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class showTimeItemRequet {
    private Integer id;
    private Integer movieId;
    private Integer cinemaId;
    private Integer roomId;
    private LocalDate days;
    private LocalTime times;
}
