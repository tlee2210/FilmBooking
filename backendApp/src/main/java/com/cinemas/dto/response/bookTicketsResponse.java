package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class bookTicketsResponse {
    List<SelectOptionReponse> city;
    List<SelectOptionReponse<?>> cinema;
    List<bookingShowTimeResponse> bookingShowTimeResponses;
}
