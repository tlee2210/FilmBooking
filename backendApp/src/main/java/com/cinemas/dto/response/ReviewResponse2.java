package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.cinemas.enums.ReviewType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class ReviewResponse2 {
    private Integer id;

    private String name;

    private ReviewType type;

    private Integer view;

    private String slug;

    private String description;

    private String thumbnail;

    private Movie movie;
}
