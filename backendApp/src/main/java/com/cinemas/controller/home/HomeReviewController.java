package com.cinemas.controller.home;

import com.cinemas.dto.request.SearchReviewRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Review;
import com.cinemas.enums.ReviewType;
import com.cinemas.service.home.HomeReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/home/review")
@Tag(name = "Home Review Controller")
public class HomeReviewController {
    @Autowired
    private HomeReviewService homeReviewService;

    @GetMapping("/v1")
    public APIResponse<SelectOptionAndModelReponse<Page<Review>>> getAllReview(
            @RequestParam(required = false) ReviewType type,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort
    ) {
        SearchReviewRequest searchReviewRequest = new SearchReviewRequest(type, pageNo - 1, pageSize, sort);
        SelectOptionAndModelReponse<Page<Review>> reviews = homeReviewService.getAllReviews(searchReviewRequest);
        APIResponse<SelectOptionAndModelReponse<Page<Review>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(reviews);

        return apiResponse;
    }

    @GetMapping("/v2")
    public APIResponse<List<ReviewResponse2>> getAllReview(
            @RequestParam(required = false) String name
    ) {
        List<ReviewResponse2> reviews = homeReviewService.getAllReviews2(name);
        APIResponse<List<ReviewResponse2>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(reviews);

        return apiResponse;
    }

    @GetMapping("/v1/home")
    public APIResponse<SelectOptionAndModelReponse<Page<Review>>> gethomeReview(
            @RequestParam(required = false) ReviewType type,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort
    ) {
        SearchReviewRequest searchReviewRequest = new SearchReviewRequest(type, pageNo, pageSize, sort);
        SelectOptionAndModelReponse<Page<Review>> reviews = homeReviewService.getAllReviews(searchReviewRequest);
        APIResponse<SelectOptionAndModelReponse<Page<Review>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(reviews);

        return apiResponse;
    }

    @GetMapping("/v1/{slug}/detail")
    public APIResponse<HomeReviewResponse> getDetailReview(@PathVariable String slug) {
        HomeReviewResponse review = homeReviewService.getReviewDetail(slug);

        APIResponse<HomeReviewResponse> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(review);


        return apiResponse;
    }

    @GetMapping("/v2/{slug}/detail")
    public APIResponse<ReviewResponse2> getDetailReview2(@PathVariable String slug) {
        APIResponse<ReviewResponse2 > apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(homeReviewService.getReviewDetail2(slug));


        return apiResponse;
    }
}
