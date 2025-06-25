package com.cinemas.dto.response;

import com.cinemas.entities.Review;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class HomeReviewResponse {
    private Review review;
    private List<ItemIntroduce> reviewList;
}
