package com.cinemas.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class BookingResponse {
    List<SelectOptionReponse> city;
    List<SelectOptionReponse<?>> movie;
}
