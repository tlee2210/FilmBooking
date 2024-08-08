package com.cinemas.service.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.HomePromotionResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Promotion;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HomePromotionService {
    Page<ItemIntroduce> getAllPromotion(PaginationHelper paginationHelper);

    List<Promotion> getAllPromotion2(String name);

    HomePromotionResponse getPromotionDetail(String slug);
}
