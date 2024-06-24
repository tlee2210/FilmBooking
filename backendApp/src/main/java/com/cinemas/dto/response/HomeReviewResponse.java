package com.cinemas.dto.response;

import com.cinemas.entities.Review;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeReviewResponse {
    private Review review;
    private List<Review> reviewList;
}
