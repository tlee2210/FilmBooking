package com.cinemas.service.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;

import com.cinemas.dto.request.WaterCornRequest;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.WaterCorn;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface WaterCornService {
    Page<WaterCorn> getAllWaterCorn(PaginationHelper PaginationHelper);

    boolean addWaterCorn(WaterCornRequest watercorn) throws IOException;



    Integer deleteWaterCorn(String slug) throws IOException;



    boolean updateWaterCorn(WaterCornRequest watercorn) throws IOException;
}
