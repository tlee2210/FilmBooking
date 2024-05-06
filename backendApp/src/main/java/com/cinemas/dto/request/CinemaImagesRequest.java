package com.cinemas.dto.request;

import com.cinemas.entities.Cinema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CinemaImagesRequest {
    private String imgName;

    private int cinema_id;
}
