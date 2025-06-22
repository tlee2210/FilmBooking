package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.ReviewResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Review;
import com.cinemas.entities.imageDescription;
import com.cinemas.enums.ReviewType;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.*;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class ReviewServiceImp implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Autowired
    imageDescriptionRespository imageDescriptionRespository;

    @Override
    public SelectOptionAndModelReponse<Page<Review>> getAllReview(SearchRequest paginationHelper) {
        List<Review> reviewList = reviewRepository.searchByName(paginationHelper.getSearchname(), (ReviewType) paginationHelper.getRole());

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
        List<SelectOptionReponse> selectOptionReponses = new ArrayList<>();

        for (ReviewType reviewType : ReviewType.values()) {
            selectOptionReponses.add(new SelectOptionReponse(reviewType.name(), reviewType.name()));
        }

        return new SelectOptionAndModelReponse<>(selectOptionReponses, reviews);
    }

    @Override
    public boolean addReview(ReviewRequest review) throws IOException {
        if (reviewRepository.findByName(review.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        Review addReview = new Review();

        ObjectUtils.copyFields(review, addReview);
        addReview.setMovie(movieRepository.getById(review.getMovieId()));

//        addReview.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));
        addReview.setSlug(generateSlug(review.getName()));

        addReview.setThumbnail(fileStorageServiceImpl.uploadFile(review.getFile(), "review"));
        List<imageDescription> imageDescriptionList = new ArrayList<>();

        if (review.getUrl() != null) {
            review.getUrl().forEach(item -> {
                imageDescription imageDescription = imageDescriptionRespository.findByUrl(item);
                imageDescription.setSlug_name(addReview.getSlug());
                imageDescriptionList.add(imageDescription);
            });
        }

        imageDescriptionRespository.saveAll(imageDescriptionList);
        addReview.setView(0);
        reviewRepository.save(addReview);

        return true;
    }


    @Override
    public Integer deleteReview(String slug) throws IOException {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);

        review.setMovie(null);

        List<imageDescription> imageDescriptionList = imageDescriptionRespository.findBySlug_name(slug);
        imageDescriptionList.forEach(item -> {
            try {
                fileStorageServiceImpl.deleteFile(item.getUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        fileStorageServiceImpl.deleteFile(review.getThumbnail());
        reviewRepository.delete(review);

        return review.getId();
    }

    @Override
    public SelectOptionAndModelReponse<ReviewResponse> getEditReview(String slug) {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);
        SelectOptionAndModelReponse<ReviewResponse> optionAndModelReponse = new SelectOptionAndModelReponse();
        ReviewResponse reviewResponse = new ReviewResponse();

        ObjectUtils.copyFields(review, reviewResponse);

        reviewResponse.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(review.getThumbnail()));
        reviewResponse.setMovieid(review.getMovie().getId());
        optionAndModelReponse.setModel(reviewResponse);

        review.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(review.getThumbnail()));
//        List<SelectOptionReponse> selectOptionReponses = new ArrayList<>();
//
//        for (ReviewType reviewType : ReviewType.values()) {
//            selectOptionReponses.add(new SelectOptionReponse(
//            reviewType.getValue(), reviewType.getValue()));
//        }

        List<SelectOptionReponse> selectOptionReponses =
                Arrays.stream(ReviewType.values())
                        .map(type -> SelectOptionReponse.builder()
                                .value(type.getValue())
                                .label(type.getValue())
                                .build())
                        .collect(Collectors.toList());

        optionAndModelReponse.setSelectOptionStatus(selectOptionReponses);

        optionAndModelReponse.setSelectOptionReponse(movieRepository.SelectOptionNameAndid());

        return optionAndModelReponse;
    }

    @Override
    public boolean updateReview(ReviewRequest review) throws IOException {
        Review wat = reviewRepository
                .findById(review.getId())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (reviewRepository.findByNameWithId(review.getName(), review.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (review.getFile() != null) {
            fileStorageServiceImpl.deleteFile(wat.getThumbnail());
            wat.setThumbnail(fileStorageServiceImpl.uploadFile(review.getFile(), "reviewThumbnail"));
        }
        String slugOld = wat.getSlug();

        ObjectUtils.copyFields(review, wat);
//        wat.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));
        wat.setSlug(generateSlug(review.getName()));
        wat.setType(review.getType());

        wat.setMovie(movieRepository.getById(review.getMovieId()));

        List<imageDescription> imageDescriptionList = imageDescriptionRespository.findBySlug_name(slugOld);

        if (review.getUrl() != null) {
            List<imageDescription> imageDelete = imageDescriptionList.stream().filter(image -> !review.getUrl().contains(image.getUrl())).peek(images -> {
                try {
                    fileStorageServiceImpl.deleteFile(images.getUrl());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toList());

            List<imageDescription> newImages = review.getUrl().stream()
                    .map(url -> {
                        imageDescription imageDescription = imageDescriptionRespository.findByUrl(url);
                        imageDescription.setSlug_name(wat.getSlug());
                        return imageDescription;
                    })
                    .collect(Collectors.toList());

            imageDescriptionRespository.saveAll(newImages);
            imageDescriptionRespository.deleteAll(imageDelete);

        } else {
            imageDescriptionRespository.deleteAll(imageDescriptionList);
        }

        reviewRepository.save(wat);

        return true;
    }

    @Override
    public SelectOptionAndModelReponse getCreate() {
        SelectOptionAndModelReponse optionAndModelReponse = new SelectOptionAndModelReponse();

        List<SelectOptionReponse> selectOptionReponses = new ArrayList<>();
//        movieGenreRepository
        for (ReviewType reviewType : ReviewType.values()) {
            selectOptionReponses.add(new SelectOptionReponse(reviewType.name(), reviewType.name()));
        }
        optionAndModelReponse.setSelectOptionStatus(selectOptionReponses);
        optionAndModelReponse.setModel(movieRepository.SelectOptionNameAndid());

        return optionAndModelReponse;
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
    }
}
