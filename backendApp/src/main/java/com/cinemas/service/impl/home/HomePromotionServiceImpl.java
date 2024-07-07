package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.HomePromotionResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Promotion;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.PromotionRepository;
import com.cinemas.service.home.HomePromotionService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class HomePromotionServiceImpl implements HomePromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<ItemIntroduce> getAllPromotion(PaginationHelper paginationHelper) {
        List<Promotion> promotions = promotionRepository.findAll();

        promotions.forEach(promotion -> {
            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(promotion.getImage());
            promotion.setImage(imageUrl);
        });

        List<ItemIntroduce> items = new ArrayList<>();
        promotions.forEach(promotion -> {
            ItemIntroduce item = new ItemIntroduce();
            ObjectUtils.copyFields(promotion, item);
            item.setDescription(null);
            item.setImagePortrait(promotion.getImage());
            items.add(item);
        });

        PagedListHolder<ItemIntroduce> pagedListHolder = new PagedListHolder<ItemIntroduce>(items);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<ItemIntroduce> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<ItemIntroduce> itemIntroduces = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), items.size());

        return itemIntroduces;
    }

    @Override
    public HomePromotionResponse getPromotionDetail(String slug) {
        Promotion promotion = promotionRepository.findBySlug(slug);

        if (promotion == null) throw new AppException(NOT_FOUND);

        promotion.setImage(fileStorageServiceImpl.getUrlFromPublicId(promotion.getImage()));

        HomePromotionResponse homePromotionResponse = new HomePromotionResponse();
        homePromotionResponse.setPromotion(promotion);
        homePromotionResponse.setPromotionRelate(promotionRepository.promotionRelate());

        homePromotionResponse.getPromotionRelate().forEach(item -> {
            item.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(item.getImagePortrait()));
        });

        return homePromotionResponse;
    }
}
