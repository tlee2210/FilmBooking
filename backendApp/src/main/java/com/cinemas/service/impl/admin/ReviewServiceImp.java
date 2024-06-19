package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.SearchReviewRequest;
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
    public Page<Review> getAllReview(PaginationHelper paginationHelper) {
        List<Review> reviewList = reviewRepository.findAll();

        reviewList.forEach(review -> {
            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(review.getThumbnail());
            review.setThumbnail(imageUrl);
        });

        PagedListHolder<Review> pagedListHolder = new PagedListHolder<Review>(reviewList);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Review> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Review> reviews = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), reviewList.size());

        return reviews;
    }

    @Override
    public boolean addReview(ReviewRequest review) throws IOException {
        if (reviewRepository.findByName(review.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        Review addReview = new Review();

        ObjectUtils.copyFields(review, addReview);

        addReview.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));
        addReview.setThumbnail(fileStorageServiceImpl.uploadFile(review.getThumbnail(), "review"));

        reviewRepository.save(addReview);

        return true;
    }


    @Override
    public Integer deleteReview(String slug) throws IOException {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(review.getThumbnail());
        reviewRepository.delete(review);

        return review.getId();
    }

    @Override
    public Review getEditReview(String slug) {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);

        review.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(review.getThumbnail()));

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

        if (review.getThumbnail() != null) {
            fileStorageServiceImpl.deleteFile(wat.getThumbnail());
            wat.setThumbnail(fileStorageServiceImpl.uploadFile(review.getThumbnail(), "review"));
        }

        ObjectUtils.copyFields(review, wat);
        wat.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));

        reviewRepository.save(wat);

        return true;
    }


}
