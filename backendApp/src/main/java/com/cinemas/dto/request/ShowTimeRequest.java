package com.cinemas.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowTimeRequest {
    @NotNull(message = "VALIDATION")
    private Integer cinemaId;

    @NotNull(message = "VALIDATION")
    private Integer movieId;

    @NotEmpty(message = "VALIDATION")
    private List<Integer> roomId;

    @NotEmpty(message = "VALIDATION")
    private List<LocalDate> days;

//    @NotEmpty(message = "VALIDATION")
    private List<LocalTime> times;

    private String movieFormat;
}
