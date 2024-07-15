package com.cinemas.dto.response;

import com.cinemas.entities.WaterCorn;
import lombok.Data;

@Data
public class BookingWaterCornResponse {
    private Integer id;

    private Integer quantity;

    private WaterCorn waterCorn;
}
