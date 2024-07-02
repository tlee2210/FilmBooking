package com.cinemas.dto.response;

import com.cinemas.entities.Promotion;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomePromotionResponse {
    private Promotion promotion;
    private List<ItemIntroduce> promotionRelate;
}
