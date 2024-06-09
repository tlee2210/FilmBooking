package com.cinemas.service.admin;

import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.dto.response.ShowTimeCreateResponse;

import java.util.List;

public interface ShowTimeService {
    ShowTimeCreateResponse getcreate();

    List<SelectOptionReponse> getRoomCreate(Integer idCinema);
}
