package com.cinemas.service.home;

import com.cinemas.dto.request.SearchReviewRequest;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Review;
import org.springframework.data.domain.Page;

public interface HomeReviewService {
    SelectOptionAndModelReponse<Page<Review>> getAllReviews(SearchReviewRequest searchReviewRequest);

    Review getReviewDetail(String slug);
}
