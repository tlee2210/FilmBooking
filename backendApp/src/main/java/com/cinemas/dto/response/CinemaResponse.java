package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CinemaResponse {
    private int id;

    private String cinemaName;

    private String cinemaAddress;

    private String hotline;

    private String information;

    private int city_id;
}
