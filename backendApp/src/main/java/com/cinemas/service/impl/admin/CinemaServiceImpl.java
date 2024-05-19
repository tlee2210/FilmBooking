package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CinemaImageRespository;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.CityRepository;
import com.cinemas.service.admin.CinemaService;
import com.cinemas.service.impl.FileStorageServiceImpl;
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
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.*;

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
            cinema.getImages().forEach(images -> {
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

        if (cinema == null) throw new AppException(NOT_FOUND);

        List<CinemaImages> cinemaImages = cinemaImageRespository.findCinemaImagesByCinema_Id(cinema.getId());
        for (CinemaImages images : cinemaImages) {
            fileStorageServiceImpl.deleteFile(images.getUrl());
            cinemaImageRespository.delete(images);
        }
        cinemaRespository.delete(cinema);

        return cinema.getId();
    }

    @Override
    public EditSelectOptionReponse<Cinema> getCinemaEdit(String slug) {

        Cinema cinema = cinemaRespository.findCinemaBySlug(slug);

        if (cinema == null) throw new AppException(NOT_FOUND);

        cinema.getImages().forEach(image -> {
            image.setUrl(fileStorageServiceImpl.getUrlFromPublicId(image.getUrl()));
        });

        List<City> cityList = cityRepository.findAll();

        List<SelectOptionReponse> options = new ArrayList<>();

        for (City city : cityList) {
            options.add(new SelectOptionReponse(city.getId(), city.getName()));
        }

        return new EditSelectOptionReponse<>(options, cinema);
    }

    @Override
    public boolean updateCinema(CinemaRequest cinemaRequest) throws IOException {

        Cinema cinema = cinemaRespository
                .findById(cinemaRequest.getId())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (cinemaRespository.findByNameWithId(cinemaRequest.getName(), cinemaRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(cinemaRequest, cinema);
        cinema.setSlug(cinemaRequest.getName().toLowerCase().replaceAll("\\s+", "-"));

        cinema.setCity(cityRepository
                .findById(cinemaRequest.getCity_id())
                .orElseThrow(() -> new AppException(UPDATE_FAILED)));

        List<Integer> newImageUrls = cinemaRequest.getImages();

        List<CinemaImages> cinemaImages = cinemaImageRespository.findCinemaImagesByCinema_Id(cinema.getId());

        cinema.setImages(new ArrayList<>());
        cinemaRespository.save(cinema);

        if (newImageUrls != null) {
            for (CinemaImages images : cinemaImages) {
                if (!(newImageUrls.contains(images.getUid()))) {
                    images.setCinema(null);

                    fileStorageServiceImpl.deleteFile(images.getUrl());

                    cinemaImageRespository.deleteByUid(images.getUid());
                }
            }
        } else {
            for (CinemaImages images : cinemaImages) {
                images.setCinema(null);

                fileStorageServiceImpl.deleteFile(images.getUrl());

                cinemaImageRespository.deleteByUid(images.getUid());
            }
        }


        if (cinemaRequest.getFiles() != null) {

            List<MultipartFile> files = cinemaRequest.getFiles();
            List<CinemaImages> newImages = new ArrayList<>();

            for (MultipartFile file : files) {
                CinemaImages image = new CinemaImages();
                image.setUrl(fileStorageServiceImpl.uploadFile(file, "cinemas"));
                image.setCinema(cinema);
                newImages.add(image);
            }

            cinemaImageRespository.saveAll(newImages);
        }

        return true;
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

        if (cinemaRespository.findCinemaByName(cinemaRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        Cinema cinema = new Cinema();

        ObjectUtils.copyFields(cinemaRequest, cinema);
        cinema.setSlug(cinemaRequest.getName().toLowerCase().replaceAll("\\s+", "-"));

        cinema.setCity(cityRepository.findById(cinemaRequest.getCity_id()).orElseThrow(() -> new AppException(UPDATE_FAILED)));

        cinemaRespository.save(cinema);

        List<MultipartFile> files = cinemaRequest.getFiles();
        List<CinemaImages> newImages = new ArrayList<>();

        for (MultipartFile file : files) {
            CinemaImages cinemaImages = new CinemaImages();
            cinemaImages.setUrl(fileStorageServiceImpl.uploadFile(file, "cinemas"));
//            cinemaImages.setCinemaId(cinema.getId());
            cinemaImages.setCinema(cinema);
            newImages.add(cinemaImages);
        }

        cinemaImageRespository.saveAll(newImages);

        return true;
    }

}
