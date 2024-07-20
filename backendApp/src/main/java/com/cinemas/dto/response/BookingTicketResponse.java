package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingTicketResponse {
    List<String> listCity;
    List<MovieBookingResponse> movieList;
    List<bookingShowTimeResponse> bookingShowTimeResponses;
}
