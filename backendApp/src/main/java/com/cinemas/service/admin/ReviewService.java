package com.cinemas.service.admin;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.SearchReviewRequest;
import com.cinemas.entities.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;

import java.io.IOException;
import java.util.List;

public interface ReviewService {
    Page<Review> getAllReview(PaginationHelper paginationHelper);
    boolean addReview(ReviewRequest review);

    Integer deleteReview(String slug);

    Review getEditReview(String slug);

    boolean updateReview(ReviewRequest review);

}
