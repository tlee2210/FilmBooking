package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.CityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.CityResponse;
import com.cinemas.entities.City;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CityRepository;
import com.cinemas.service.admin.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public Page<CityResponse> getCitiesAll(PaginationHelper PaginationHelper) {
        List<City> cities = cityRepository.findAll();
        List<CityResponse> responseList = new ArrayList<>();
        for (City city : cities
        ) {
            CityResponse cityResponse = new CityResponse();
            ObjectUtils.copyFields(city, cityResponse);
            responseList.add(cityResponse);
        }

        PagedListHolder<CityResponse> pagedListHolder = new PagedListHolder<CityResponse>(responseList);
        pagedListHolder.setPage(PaginationHelper.getPageNo());
        pagedListHolder.setPageSize(PaginationHelper.getPageSize());

        List<CityResponse> pageList = pagedListHolder.getPageList();
        boolean ascending = PaginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(PaginationHelper.getSortByColumn(), true, ascending));

        Page<CityResponse> celebrities = new PageImpl<>(pageList, new PaginationHelper().getPageable(PaginationHelper), cities.size());

        return celebrities;
    }

    @Override
    public CityResponse getCity(int id) {
        City city = cityRepository.findById(id).orElseThrow(() -> new AppException(NOT_FOUND));
        CityResponse cityResponse = new CityResponse();
        ObjectUtils.copyFields(city, cityResponse);
        return cityResponse;
    }

    @Override
    public boolean addCity(CityRequest city) {
        City cityEntity = new City();
        City check = cityRepository.findByName(city.getName());
        if (check != null) throw new AppException(NAME_EXISTED);
        cityEntity.setName(city.getName());
        String slug = city.getName().toLowerCase().replaceAll("\\s+", "-");
        cityEntity.setSlug(slug);
        cityRepository.save(cityEntity);
        return true;
    }

    @Override
    public boolean updateCity(CityRequest city) {
        City cityold = cityRepository.findById(city.getId()).orElseThrow(() -> new AppException(NOT_FOUND));
        City check = cityRepository.findByNameWithId(city.getName(), city.getId());
        if (check != null) throw new AppException(NAME_EXISTED);
        cityold.setName(city.getName());
        String slug = city.getName().toLowerCase().replaceAll("\\s+", "-");
        cityold.setSlug(slug);
        cityRepository.save(cityold);
        return true;
    }

    @Override
    public boolean deleteCity(int id) {
        City city = cityRepository.getById(id);
        cityRepository.delete(city);
        return true;
    }
}
