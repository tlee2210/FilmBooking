package com.cinemas.controller.admin;

import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.ReviewResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Review;
import com.cinemas.enums.ReviewType;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.ReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/review")
@Tag(name = "Dashboard Review Controller")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    /**
     * @param name
     * @param pageNo
     * @param pageSize
     * @param sort
     * @return
     */
    @GetMapping("/v1")
    public APIResponse<SelectOptionAndModelReponse<Page<Review>>> getReview(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) ReviewType type,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort) {
        SearchRequest searchRequest = new SearchRequest(name, type, pageNo - 1, pageSize, sort);

        SelectOptionAndModelReponse<Page<Review>> reviewList = reviewService.getAllReview(searchRequest);
        APIResponse<SelectOptionAndModelReponse<Page<Review>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(reviewList);

        return apiResponse;
    }

    @GetMapping("/v1/create")
    public APIResponse<SelectOptionAndModelReponse> getReview() {

        APIResponse<SelectOptionAndModelReponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(reviewService.getCreate());

        return apiResponse;
    }

    /**
     * create new Review
     *
     * @return
     * @throws IOException
     */
    @PostMapping("/v1/create")
    public APIResponse<String> createReview(@ModelAttribute ReviewRequest reviewRequest) throws IOException {
        boolean checkCreate = reviewService.addReview(reviewRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Review created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    /**
     * delete Review by id
     *
     * @param slug
     * @return
     * @throws IOException
     */
    @DeleteMapping("/v1/delete/{slug}")
    public APIResponse<Integer> deleteReview(@PathVariable String slug) throws IOException {

        int id = reviewService.deleteReview(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted review");
            apiResponse.setResult(id);

            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }

    /**
     * get Celebrity by id
     *
     * @param slug
     * @return
     */
    @GetMapping("/v1/{slug}/edit")
    public APIResponse<SelectOptionAndModelReponse<ReviewResponse>> getEditWaterCorn(@PathVariable String slug) {
        SelectOptionAndModelReponse<ReviewResponse> modelReponse = reviewService.getEditReview(slug);

        APIResponse<SelectOptionAndModelReponse<ReviewResponse>> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(modelReponse);

        return apiResponse;
    }

    /**
     * @param
     * @return
     * @throws IOException
     */
    @PutMapping(value = "/v1/update")
    public APIResponse<String> updateReview(@ModelAttribute ReviewRequest reviewRequest) throws IOException {
        boolean checkUpdate = reviewService.updateReview(reviewRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Review Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }
}
