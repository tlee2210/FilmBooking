package com.cinemas.dto.request;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class RoomRequest {
    public Integer id;
    public String name;
    public Integer SeatRows;
    public Integer SeatColumns;
    public Integer doubleSeatRows;
    public Integer doubleSeatColumns;
    public Integer totalColumn;
    public Integer cinema;
}
