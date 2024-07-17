package com.cinemas.service.admin;

import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.WaterCornRequest;
import com.cinemas.entities.WaterCorn;
import org.springframework.data.domain.Page;

import java.io.IOException;

public interface WaterCornService {
    Page<WaterCorn> getAllWaterCorn(SearchRequest PaginationHelper);

    boolean addWaterCorn(WaterCornRequest watercorn) throws IOException;

    Integer deleteWaterCorn(String slug) throws IOException;

    WaterCorn getEditWaterCorn(String slug) throws IOException;

    boolean updateWaterCorn(WaterCornRequest watercorn) throws IOException;
}
