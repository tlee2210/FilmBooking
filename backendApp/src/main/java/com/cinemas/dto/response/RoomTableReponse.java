package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomTableReponse {
    private Integer id;
    private String name;
    private Integer SeatRows;
    private Integer SeatColumns;
    private Integer doubleSeatRows;
    private Integer doubleSeatColumns;
    private Integer totalColumn;
    private String cinemaName;
    private Integer cinemaId;
}
