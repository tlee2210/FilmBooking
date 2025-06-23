package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class bookTicketsResponse {
    List<SelectOptionReponse> city;
    List<SelectOptionReponse<?>> cinema;
    List<bookingShowTimeResponse> bookingShowTimeResponses;
}
