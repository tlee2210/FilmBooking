package com.cinemas.dto.response;

import com.cinemas.entities.WaterCorn;
import lombok.Data;

import java.util.List;

@Data
public class SeatBookedResponse {
    private String seatBooked;

    private List<WaterCorn> waterCorns;
}
