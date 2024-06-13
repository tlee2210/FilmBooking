package com.cinemas.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class MovieBlogRequest {
    private Integer id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;
}
