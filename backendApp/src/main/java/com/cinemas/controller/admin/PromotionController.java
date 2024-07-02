package com.cinemas.controller.admin;

import com.cinemas.dto.request.PromotionRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.entities.Promotion;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.PromotionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/promotion")
@Tag(name = "Dashboard Promotion Controller")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping
    public APIResponse<Page<Promotion>> getAllPromotion(
            @RequestParam(required = false) String name,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort
    ) {
        SearchRequest searchRequest = new SearchRequest(name, pageNo - 1, pageSize, sort);
        APIResponse<Page<Promotion>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(promotionService.getAllPromotion(searchRequest));

        return apiResponse;
    }

    @PostMapping("/create")
    public APIResponse<String> createPromotion(@ModelAttribute PromotionRequest promotionRequest) throws IOException {
        boolean checkCreate = promotionService.addPromotion(promotionRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Promotion created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{slug}/edit")
    public APIResponse<Promotion> getPromotionById(@PathVariable String slug) {
        APIResponse<Promotion> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(promotionService.getEditPromotion(slug));

        return apiResponse;
    }

    @PutMapping("/update")
    public APIResponse<String> updatePromotion(@ModelAttribute PromotionRequest promotionRequest) throws IOException {
        boolean checkUpdate = promotionService.updatePromotion(promotionRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Promotion Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    @DeleteMapping("/delete/{slug}")
    public APIResponse<Integer> deletePromotion(@PathVariable String slug) throws IOException {

        int id = promotionService.deletePromotion(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted promotion");
            apiResponse.setResult(id);

            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }
}
