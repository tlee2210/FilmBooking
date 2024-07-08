package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BuyTicketResponse {
    List<SelectOptionReponse> movieList;
    List<SelectOptionReponse> cinemaList;
    List<LocalDate> dateList;
    List<HomeMovieFormatResponse> movieFormat;
}
