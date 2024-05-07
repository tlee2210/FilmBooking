package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CinemaImgResponse {
    private int id;

    private String imgName;

    private int cinema_id;
}
