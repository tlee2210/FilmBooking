package com.cinemas.service.admin;

import com.cinemas.dto.request.PromotionRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.entities.Promotion;
import org.springframework.data.domain.Page;

import java.io.IOException;

public interface PromotionService {
    Page<Promotion> getAllPromotion(SearchRequest paginationHelper);

    boolean addPromotion(PromotionRequest promotionRequest) throws IOException;

    Promotion getEditPromotion(String slug);

    boolean updatePromotion(PromotionRequest promotionRequest) throws IOException;

    Integer deletePromotion(String slug) throws IOException;
}
