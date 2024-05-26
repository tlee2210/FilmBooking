package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.cinemaSearchRequest;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.*;
import com.cinemas.enums.StatusCinema;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CinemaImageRespository;
import com.cinemas.repositories.CinemaRespository;
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

import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@Service
public class CinemaServiceImpl implements CinemaService {
    @Autowired
    private CinemaImageRespository cinemaImageRespository;

    @Autowired
    private CinemaRespository cinemaRespository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public SelectOptionAndModelReponse<Page<Cinema>> getAllCinema(cinemaSearchRequest PaginationHelper) {

        List<Cinema> cinemaList = cinemaRespository.searchCinema(PaginationHelper.getSearchname(), PaginationHelper.getStatus(), PaginationHelper.getCity());

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

        List<String> cityList = cinemaRespository.findByCity();

        List<SelectOptionReponse> options = new ArrayList<>();
        cityList.forEach(item -> {
            options.add(new SelectOptionReponse(item, item));
        });

        return new SelectOptionAndModelReponse<>(options, cinemas);
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

        cinema.getMovies().clear();
        cinemaRespository.save(cinema);

        cinemaRespository.delete(cinema);

        return cinema.getId();
    }

    @Override
    public Cinema getCinemaEdit(String slug) {
        Cinema cinema = cinemaRespository.findCinemaBySlug(slug);

        if (cinema == null) throw new AppException(NOT_FOUND);

        cinema.getImages().forEach(image -> {
            image.setUrl(fileStorageServiceImpl.getUrlFromPublicId(image.getUrl()));
        });

        return cinema;
    }

    @Override
    public boolean updateCinema(CinemaRequest cinemaRequest) throws IOException {
        Cinema cinema = cinemaRespository.findById(cinemaRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if (cinemaRespository.findByNameWithId(cinemaRequest.getName(), cinemaRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(cinemaRequest, cinema);
        cinema.setSlug(cinemaRequest.getName().toLowerCase().replaceAll("\\s+", "-"));

        List<CinemaImages> cinemaImages = cinemaImageRespository.findCinemaImagesByCinema_Id(cinema.getId());

        cinema.setImages(new ArrayList<>());
        cinemaRespository.save(cinema);

        if (cinemaRequest.getImages() != null) {
            List<Integer> newImageUrls = cinemaRequest.getImages();

            List<CinemaImages> imagesToDelete = cinemaImages.stream().filter(images -> !newImageUrls.contains(images.getUid())).peek(images -> {
                images.setCinema(null);
                try {
                    fileStorageServiceImpl.deleteFile(images.getUrl());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toList());

            cinemaImageRespository.deleteAll(imagesToDelete);
        } else {
            cinemaImages.forEach(images -> {
                images.setCinema(null);
                try {
                    fileStorageServiceImpl.deleteFile(images.getUrl());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            cinemaImageRespository.deleteAll(cinemaImages);
        }

        if (cinemaRequest.getFiles() != null) {
            List<MultipartFile> files = cinemaRequest.getFiles();

            List<CompletableFuture<String>> futureUrls = fileStorageServiceImpl.uploadFilesAsync(files, "cinemas");
            List<String> urls = futureUrls.stream().map(CompletableFuture::join).collect(Collectors.toList());

            List<CinemaImages> newImages = new ArrayList<>();
            for (String url : urls) {
                CinemaImages Images = new CinemaImages();
                Images.setUrl(url);
                Images.setCinema(cinema);
                newImages.add(Images);
            }

            cinemaImageRespository.saveAll(newImages);
        }

        return true;
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
        cinema.setStatus(StatusCinema.ACTIVE);

        cinemaRespository.save(cinema);

        List<MultipartFile> files = cinemaRequest.getFiles();

        List<CompletableFuture<String>> futureUrls = fileStorageServiceImpl.uploadFilesAsync(files, "cinemas");
        List<String> urls = futureUrls.stream().map(CompletableFuture::join).collect(Collectors.toList());


        List<CinemaImages> newImages = new ArrayList<>();
        for (String url : urls) {
            CinemaImages cinemaImages = new CinemaImages();
            cinemaImages.setUrl(url);
            cinemaImages.setCinema(cinema);
            newImages.add(cinemaImages);
        }

        cinemaImageRespository.saveAll(newImages);

        return true;
    }
}
