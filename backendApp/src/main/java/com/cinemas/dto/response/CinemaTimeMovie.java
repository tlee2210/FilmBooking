package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CinemaTimeMovie {
    private String name;
    private List<HomeTimeAndRoomResponse> times;

    public CinemaTimeMovie(String name) {
        this.name = name;
    }
}
