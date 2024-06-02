package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomTableReponse {
    private Integer id;
    private String name;
    private Integer SeatRows;
    private Integer SeatColumns;
    private Integer doubleSeatRows;
    private Integer doubleSeatColumns;
    private String cinemaName;
    private Integer cinemaId;
}
