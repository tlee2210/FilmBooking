package com.cinemas.service.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.HomePromotionResponse;
import com.cinemas.dto.response.ItemIntroduce;
import org.springframework.data.domain.Page;

public interface HomePromotionService {
    Page<ItemIntroduce> getAllPromotion(PaginationHelper paginationHelper);

    HomePromotionResponse getPromotionDetail(String slug);
}
