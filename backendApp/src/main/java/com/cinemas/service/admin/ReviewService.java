package com.cinemas.service.admin;

import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.ReviewResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Review;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface ReviewService {
    SelectOptionAndModelReponse<Page<Review>> getAllReview(SearchRequest paginationHelper);

    boolean addReview(ReviewRequest review) throws IOException;

    Integer deleteReview(String slug) throws IOException;

    SelectOptionAndModelReponse<ReviewResponse> getEditReview(String slug);

    boolean updateReview(ReviewRequest review) throws IOException;

    SelectOptionAndModelReponse getCreate();
}
