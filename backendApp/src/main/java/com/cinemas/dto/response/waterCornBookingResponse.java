package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class waterCornBookingResponse {
    private Integer id;
    private String name;
    private Integer quantity;
}
