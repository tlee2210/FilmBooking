package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchReviewRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Review;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.ReviewType;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.ReviewRepository;
import com.cinemas.service.home.HomeReviewService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class HomeReviewServiceImpl implements HomeReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public SelectOptionAndModelReponse<Page<Review>> getAllReviews(SearchReviewRequest searchReviewRequest) {
//        List<Review> reviewList = reviewRepository.findByType(searchReviewRequest.type);
//
//        reviewList.forEach(item -> {
//            item.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(item.getThumbnail()));
//        });

        List<Review> reviewList = reviewRepository.findByType(searchReviewRequest.type)
                .stream()
                .peek(item -> item.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(item.getThumbnail())))
                .toList();

        PagedListHolder<Review> pagedListHolder = new PagedListHolder<Review>(reviewList);
        pagedListHolder.setPage(searchReviewRequest.getPageNo());
        pagedListHolder.setPageSize(searchReviewRequest.getPageSize());

        List<Review> pageList = pagedListHolder.getPageList();
        boolean ascending = searchReviewRequest.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(searchReviewRequest.getSortByColumn(), true, ascending));

        Page<Review> reviews = new PageImpl<>(pageList, new PaginationHelper().getPageable(searchReviewRequest), reviewList.size());

//        List<SelectOptionReponse> optionsTypes = new ArrayList<>();
//
//        for (ReviewType reviewType : ReviewType.values()) {
//            optionsTypes.add(new SelectOptionReponse(reviewType.name(), reviewType.getValue()));
//        }
//
        List<SelectOptionReponse> optionsTypes = Arrays.stream(ReviewType.values())
                .map(Option -> SelectOptionReponse.builder()
                        .value(Option.name())
                        .label(Option.name())
                        .build())
                .collect(Collectors.toList());

        return new SelectOptionAndModelReponse<>(optionsTypes, reviews);
    }

    @Override
    public List<ReviewResponse2> getAllReviews2(String name) {
//        List<Review> reviewList = reviewRepository.findListByName(name);
//
//        reviewList.forEach(item -> {
//            item.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(item.getThumbnail()));
//        });

        List<Review> reviewList = reviewRepository.findListByName(name)
                .stream()
                .peek(item -> item.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(item.getThumbnail())))
                .toList();

//        List<ReviewResponse2> reviews = new ArrayList<>();
//        for (Review review : reviewList) {
//            ReviewResponse2 response = new ReviewResponse2();
//            ObjectUtils.copyFields(review, response);
//            reviews.add(response);
//        }

        List<ReviewResponse2> reviews = reviewList.stream()
                .map(item -> ReviewResponse2.builder()
                        .id(item.getId())
                        .name(item.getName())
                        .type(item.getType())
                        .view(item.getView())
                        .slug(item.getSlug())
                        .description(item.getDescription())
                        .thumbnail(item.getThumbnail())
                        .movie(item.getMovie())
                        .build())
                .collect(Collectors.toList());

        return reviews;
    }

    @Override
    public HomeReviewResponse getReviewDetail(String slug) {

        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);
        review.setView(review.getView() + 1);
        reviewRepository.save(review);

//        HomeReviewResponse homeReviewResponse = new HomeReviewResponse();
//        homeReviewResponse.setReview(review);
//        homeReviewResponse.setReviewList(reviewRepository.reviewRelate(review.getType()));
//
//        homeReviewResponse.getReviewList().forEach(item -> {
//            item.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(item.getImagePortrait()));
//        });

        HomeReviewResponse homeReviewResponse = HomeReviewResponse
                .builder()
                .review(review)
                .reviewList(reviewRepository.reviewRelate(review.getType())
                        .stream()
                        .peek(item -> item.setImagePortrait(
                                fileStorageServiceImpl.getUrlFromPublicId(item.getImagePortrait())))
                        .toList())
                .build();

        return homeReviewResponse;
    }

    @Override
    public ReviewResponse2 getReviewDetail2(String slug) {
        Review review = reviewRepository.findBySlug(slug);
        if (review == null) throw new AppException(NOT_FOUND);
        review.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(review.getThumbnail()));
        review.setView(review.getView() + 1);
        reviewRepository.save(review);

//        ReviewResponse2 reviewResponse = new ReviewResponse2();
//        ObjectUtils.copyFields(review, reviewResponse2);

        ReviewResponse2 reviewResponse = ReviewResponse2.builder()
                .id(review.getId())
                .name(review.getName())
                .type(review.getType())
                .view(review.getView())
                .slug(review.getSlug())
                .description(review.getDescription())
                .thumbnail(review.getThumbnail())
                .movie(review.getMovie())
                .build();

        return reviewResponse;
    }
}
