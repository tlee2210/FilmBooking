package com.cinemas.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HomeSliderResponse {
    private List<SelectOptionReponse> imagePromotions;

    private List<SelectOptionReponse> imageMovies;
}
