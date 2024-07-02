package com.cinemas.controller.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.HomePromotionResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.service.home.HomePromotionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home/v1/promotion")
@Tag(name = "Home Promotion Controller")
public class HomePromotionController {
    @Autowired
    private HomePromotionService homePromotionService;

    @GetMapping
    public APIResponse<Page<ItemIntroduce>> getAllPromotion(
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort
    ) {
        PaginationHelper paginationHelper = new PaginationHelper(pageNo - 1, pageSize, sort, "id");
        Page<ItemIntroduce> promotions = homePromotionService.getAllPromotion(paginationHelper);
        APIResponse<Page<ItemIntroduce>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(promotions);

        return apiResponse;
    }

    @GetMapping("/detail/{slug}")
    public APIResponse<HomePromotionResponse> getDetailPromotion(@PathVariable String slug) {
        APIResponse<HomePromotionResponse> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homePromotionService.getPromotionDetail(slug));

        return apiResponse;
    }
}
