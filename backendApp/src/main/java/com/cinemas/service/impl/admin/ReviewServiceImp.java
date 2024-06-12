package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Review;
import com.cinemas.entities.WaterCorn;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.ReviewRepository;
import com.cinemas.service.admin.ReviewService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class ReviewServiceImp implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<Review> getAllReview(SearchRequest PaginationHelper) {
        List<Review> reviewList = reviewRepository.searchByName(PaginationHelper.getSearchname());

        PagedListHolder<Review> pagedListHolder = new PagedListHolder<Review>(reviewList);
        pagedListHolder.setPage(PaginationHelper.getPageNo());
        pagedListHolder.setPageSize(PaginationHelper.getPageSize());

        List<Review> pageList = pagedListHolder.getPageList();
        boolean ascending = PaginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(PaginationHelper.getSortByColumn(), true, ascending));

        Page<Review> reviews = new PageImpl<>(pageList, new PaginationHelper().getPageable(PaginationHelper), reviewList.size());

        return reviews;
    }

    @Override
    public boolean addReview(ReviewRequest review) {
        if (reviewRepository.findByName(review.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        Review addReview = new Review();

        ObjectUtils.copyFields(review, addReview);

        addReview.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));

        reviewRepository.save(addReview);

        return true;
    }


    @Override
    public Integer deleteReview(String slug) throws IOException {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);

        reviewRepository.delete(review);

        return review.getId();
    }

    @Override
    public Review getEditReview(String slug) throws IOException {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);

        return review;
    }

    @Override
    public boolean updateReview(ReviewRequest review) throws IOException {
        Review wat = reviewRepository
                .findById(review.getId())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (reviewRepository.findByNameWithId(review.getName(), review.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(review, wat);
        wat.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));

        reviewRepository.save(wat);

        return true;
    }


}
