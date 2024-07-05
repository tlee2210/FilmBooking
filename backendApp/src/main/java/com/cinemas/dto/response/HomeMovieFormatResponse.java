package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeMovieFormatResponse {
    private String name;
    private List<HomeTimeAndRoomResponse> times;

    public HomeMovieFormatResponse(String name) {
        this.name = name;
    }
}
