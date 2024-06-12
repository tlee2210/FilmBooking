package com.cinemas.service.admin;

import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.entities.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;

import java.io.IOException;
import java.util.List;

public interface ReviewService {
    Page<Review> getAllReview(SearchRequest PaginationHelper);
    boolean addReview(ReviewRequest review) throws IOException;

    Integer deleteReview(String slug) throws IOException;

    Review getEditReview(String slug) throws IOException;

    boolean updateReview(ReviewRequest review) throws IOException;

}
