package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class BuyTicketResponse {
    List<SelectOptionReponse> movieList;
    List<SelectOptionReponse> cinemaList;
    List<LocalDate> dateList;
    List<HomeMovieFormatResponse> movieFormat;
}
