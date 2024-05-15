package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.CinemaImages;
import com.cinemas.entities.City;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CinemaImageRespository;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.CityRepository;
import com.cinemas.service.admin.CinemaService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class CinemaServiceImpl implements CinemaService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CinemaImageRespository cinemaImageRespository;

    @Autowired
    private CinemaRespository cinemaRespository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public Page<Cinema> getAllCinema(PaginationHelper PaginationHelper) {

        List<Cinema> cinemaList = cinemaRespository.findAll();

        cinemaList.forEach(cinema -> {
            List<CinemaImages> cinemaImages = cinema.getImages();

            cinemaImages.forEach(images -> {
                images.setUrl(fileStorageServiceImpl.getUrlFromPublicId(images.getUrl()));
            });
        });

        PagedListHolder<Cinema> pagedListHolder = new PagedListHolder<Cinema>(cinemaList);
        pagedListHolder.setPage(PaginationHelper.getPageNo());
        pagedListHolder.setPageSize(PaginationHelper.getPageSize());

        List<Cinema> pageList = pagedListHolder.getPageList();
        boolean ascending = PaginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(PaginationHelper.getSortByColumn(), true, ascending));

        Page<Cinema> cinemas = new PageImpl<>(pageList, new PaginationHelper().getPageable(PaginationHelper), cinemaList.size());

        return cinemas;
    }

    @Override
    public Integer deleteCinema(String slug) throws IOException {
        Cinema cinema = cinemaRespository.findCinemaBySlug(slug);
        if (cinema == null)
            throw new AppException(NOT_FOUND);

        List<CinemaImages> cinemaImages = cinemaImageRespository.findCinemaImagesByCinema_Id(cinema.getId());
        for (CinemaImages images : cinemaImages
        ) {
            fileStorageServiceImpl.deleteFile(images.getUrl());
            cinemaImageRespository.delete(images);
        }
        cinemaRespository.delete(cinema);
        return 1;

    }

    @Override
    public List<SelectOptionReponse> getCreateCinema() {
        List<City> cityList = cityRepository.findAll();
        List<SelectOptionReponse> selectOptionReponses = new ArrayList<>();
        for (City city : cityList) {
            selectOptionReponses.add(new SelectOptionReponse(city.getId(), city.getName()));
        }
        return selectOptionReponses;
    }

    @Override
    @Transactional
    public boolean createCinema(CinemaRequest cinemaRequest) throws IOException {
        Cinema cinema = new Cinema();

        ObjectUtils.copyFields(cinemaRequest, cinema);
        cinema.setSlug(cinemaRequest.getName().toLowerCase().replaceAll("\\s+", "-"));

        cinema.setCity(cityRepository.findById(cinemaRequest.getCity_id())
                .orElseThrow(() -> new EntityNotFoundException("City not found")));

        cinemaRespository.save(cinema);

        List<MultipartFile> files = cinemaRequest.getFiles();
        for (MultipartFile file : files
        ) {
            CinemaImages cinemaImages = new CinemaImages();
            cinemaImages.setUrl(fileStorageServiceImpl.uploadFile(file, "cinemas"));
            cinemaImages.setCinema(cinema);
            cinemaImageRespository.save(cinemaImages);
        }
        return true;
    }


}
