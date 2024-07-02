package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.PromotionRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.entities.Promotion;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.PromotionRepository;
import com.cinemas.service.admin.PromotionService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<Promotion> getAllPromotion(SearchRequest paginationHelper) {
        List<Promotion> promotions = promotionRepository.searchByName(paginationHelper.getSearchname());

        promotions.forEach(promotion -> {
            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(promotion.getImage());
            promotion.setImage(imageUrl);
        });

        PagedListHolder<Promotion> pagedListHolder = new PagedListHolder<Promotion>(promotions);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Promotion> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Promotion> promotionList = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), promotions.size());

        return promotionList;
    }

    @Override
    public boolean addPromotion(PromotionRequest promotionRequest) throws IOException {
        if (promotionRepository.findByName(promotionRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        Promotion promotion = new Promotion();

        promotion.setImage(fileStorageServiceImpl.uploadFile(promotionRequest.getImage(), "promotion"));
        ObjectUtils.copyFields(promotionRequest, promotion);

        promotion.setSlug(promotionRequest.getName().toLowerCase().replaceAll("\\s+", "-"));

        promotionRepository.save(promotion);
        return true;
    }

    @Override
    public Promotion getEditPromotion(String slug) {
        Promotion promotion = promotionRepository.findBySlug(slug);
        if (promotion == null) throw new AppException(NOT_FOUND);

        promotion.setImage(fileStorageServiceImpl.getUrlFromPublicId(promotion.getImage()));
        return promotion;
    }

    @Override
    public boolean updatePromotion(PromotionRequest promotionRequest) throws IOException {
        Promotion promotion = promotionRepository.findById(promotionRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if (promotionRepository.findByNameWithId(promotionRequest.getName(), promotionRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (promotionRequest.getImage() != null) {
            fileStorageServiceImpl.deleteFile(promotion.getImage());
            promotion.setImage(fileStorageServiceImpl.uploadFile(promotionRequest.getImage(), "promotion"));
        }

        ObjectUtils.copyFields(promotionRequest, promotion);

        String slug = promotionRequest.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-");
        promotion.setSlug(slug);

        promotionRepository.save(promotion);

        return true;
    }

    @Override
    public Integer deletePromotion(String slug) throws IOException {
        Promotion promotion = promotionRepository.findBySlug(slug);

        if (promotion == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(promotion.getImage());

        promotionRepository.delete(promotion);

        return promotion.getId();
    }
}
