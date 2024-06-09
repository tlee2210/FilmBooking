package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowTimeCreateResponse {
    private List<SelectOptionReponse> selectMovie;
    private List<SelectOptionReponse> selectCinema;
}
