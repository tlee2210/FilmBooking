package com.cinemas.dto.response;

import com.cinemas.entities.CinemaImages;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CinemaResponse {
    private Integer id;

    private String name;

    private String slug;

    private String address;

    private CinemaImages images;
}
