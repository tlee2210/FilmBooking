package com.cinemas.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class HomeCarouselResponse {
    private List<SelectOptionReponse> imagePromotions;

    private List<SelectOptionReponse> imageMovies;
}
