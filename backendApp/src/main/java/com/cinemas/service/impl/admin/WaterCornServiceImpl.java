package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.WaterCornRequest;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.entities.WaterCorn;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.WaterCornRepository;
import com.cinemas.service.admin.WaterCornService;
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

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class WaterCornServiceImpl implements WaterCornService {
    @Autowired
    WaterCornRepository waterCornRepository;
    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<WaterCorn> getAllWaterCorn(PaginationHelper PaginationHelper) {
        List<WaterCorn> watercornList = waterCornRepository.findAll();

        watercornList.forEach(waterCorn -> {
            String imageUrl = fileStorageServiceImpl.getUrlFromPublicId(waterCorn.getImage());
            waterCorn.setImage(imageUrl);
        });

        PagedListHolder<WaterCorn> pagedListHolder = new PagedListHolder<WaterCorn>(watercornList);
        pagedListHolder.setPage(PaginationHelper.getPageNo());
        pagedListHolder.setPageSize(PaginationHelper.getPageSize());

        List<WaterCorn> pageList = pagedListHolder.getPageList();
        boolean ascending = PaginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(PaginationHelper.getSortByColumn(), true, ascending));

        Page<WaterCorn> watercorns = new PageImpl<>(pageList, new PaginationHelper().getPageable(PaginationHelper), watercornList.size());

        return watercorns;
    }

    @Override
    public boolean addWaterCorn(WaterCornRequest watercorn) throws IOException {
        if (waterCornRepository.findByName(watercorn.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }
        WaterCorn addWaterCorn = new WaterCorn();

        ObjectUtils.copyFields(watercorn, addWaterCorn);

        addWaterCorn.setSlug(watercorn.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));

        addWaterCorn.setImage(fileStorageServiceImpl.uploadFile(watercorn.getFile(), "waterCorn"));
        waterCornRepository.save(addWaterCorn);

        return true;
    }


    @Override
    public Integer deleteWaterCorn(String slug) throws IOException {
        WaterCorn watercorn = waterCornRepository.findBySlug(slug);

        if (watercorn == null) throw new AppException(NOT_FOUND);

        fileStorageServiceImpl.deleteFile(watercorn.getImage());
        waterCornRepository.delete(watercorn);

        return watercorn.getId();
    }

    @Override
    public WaterCorn getEditWaterCorn(String slug) throws IOException {
        WaterCorn waterCorn = waterCornRepository.findBySlug(slug);

        if (waterCorn == null) throw new AppException(NOT_FOUND);
        waterCorn.setImage(fileStorageServiceImpl.getUrlFromPublicId(waterCorn.getImage()));


        return waterCorn;
    }


    @Override
    public boolean updateWaterCorn(WaterCornRequest watercorn) throws IOException {
        WaterCorn wat = waterCornRepository
                .findById(watercorn.getId())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (waterCornRepository.findByNameWithId(watercorn.getName(), watercorn.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (watercorn.getFile() != null) {
            fileStorageServiceImpl.deleteFile(wat.getImage());
            wat.setImage(fileStorageServiceImpl.uploadFile(watercorn.getFile(), "waterCorn"));
        }

        ObjectUtils.copyFields(watercorn, wat);
        wat.setSlug(watercorn.getName().toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-"));

        waterCornRepository.save(wat);

        return true;
    }
}
