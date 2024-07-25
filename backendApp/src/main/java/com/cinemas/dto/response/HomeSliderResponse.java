package com.cinemas.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class HomeSliderResponse {
    private List<SelectOptionReponse> imagePromotions;

    private List<SelectOptionReponse> imageMovies;
}
