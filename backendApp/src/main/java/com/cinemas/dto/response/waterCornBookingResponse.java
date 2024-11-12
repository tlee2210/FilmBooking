package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class waterCornBookingResponse {
    private Integer id;
    private String name;
    private Integer quantity;
}
