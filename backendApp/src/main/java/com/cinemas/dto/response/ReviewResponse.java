package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.cinemas.enums.ReviewType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class ReviewResponse {
    private Integer id;

    private String name;

    private ReviewType type;

    private Integer views = 0;

    private String slug;

    private String description;

    private String thumbnail;

    private Integer movieid;
}
