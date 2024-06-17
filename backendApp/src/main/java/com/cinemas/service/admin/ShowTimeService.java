package com.cinemas.service.admin;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.ShowTimeRequest;
import com.cinemas.dto.request.searchShowTimeRequest;
import com.cinemas.dto.request.showTimeItemRequet;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.dto.response.ShowTimeCreateResponse;
import com.cinemas.dto.response.ShowTimeTableResponse;
import com.cinemas.entities.Showtimes;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ShowTimeService {
    ShowTimeCreateResponse getcreate();

    List<SelectOptionReponse> getRoomCreate(Integer idCinema);

    boolean createShowTime(ShowTimeRequest showTimeRequest);

    SelectOptionAndModelReponse<Page<ShowTimeTableResponse>> getAllShowTime(searchShowTimeRequest paginationHelper);

    boolean delete(Integer id);

    showTimeItemRequet getEdit(Integer id);

    boolean updateShowTime(showTimeItemRequet showTimeItemRequet);
}
