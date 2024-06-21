package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.ReviewRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.SearchReviewRequest;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Review;
import com.cinemas.entities.WaterCorn;
import com.cinemas.entities.imageDescription;
import com.cinemas.enums.ReviewType;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.ReviewRepository;
import com.cinemas.repositories.imageDescriptionRespository;
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
import java.util.List;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class ReviewServiceImp implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

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

        addReview.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));
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

        reviewRepository.save(addReview);

        return true;
    }


    @Override
    public Integer deleteReview(String slug) throws IOException {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);

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
    public SelectOptionAndModelReponse<Review> getEditReview(String slug) {
        Review review = reviewRepository.findBySlug(slug);

        if (review == null) throw new AppException(NOT_FOUND);

        review.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(review.getThumbnail()));
        List<SelectOptionReponse> selectOptionReponses = new ArrayList<>();

        for (ReviewType reviewType : ReviewType.values()) {
            selectOptionReponses.add(new SelectOptionReponse(reviewType.name(), reviewType.name()));
        }

        return new SelectOptionAndModelReponse<>(selectOptionReponses, review);
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
        wat.setSlug(review.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));
        wat.setType(review.getType());
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
    public List<SelectOptionReponse> getCreate() {
        List<SelectOptionReponse> selectOptionReponses = new ArrayList<>();

        for (ReviewType reviewType : ReviewType.values()) {
            selectOptionReponses.add(new SelectOptionReponse(reviewType.name(), reviewType.name()));
        }

        return selectOptionReponses;
    }
}
