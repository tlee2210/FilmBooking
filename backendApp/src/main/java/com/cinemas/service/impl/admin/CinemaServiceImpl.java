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
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CinemaServiceImpl implements CinemaService {
    CinemaImageRespository cinemaImageRespository;

    CinemaRespository cinemaRespository;

    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public SelectOptionAndModelReponse<Page<Cinema>> getAllCinema(cinemaSearchRequest PaginationHelper) {

        List<Cinema> cinemaList = cinemaRespository.searchCinema(PaginationHelper.getSearchname(), PaginationHelper.getStatus(), PaginationHelper.getCity());

        cinemaList.forEach(cinema -> {
            cinema.setDescription(cinema.getDescription());
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
        Cinema cinema = findCinemaById(cinemaRequest.getId());

        // Kiểm tra tên rạp đã tồn tại chưa (trừ chính nó)
        if (cinemaRespository.findByNameWithId(cinemaRequest.getName(), cinemaRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        // Cập nhật thông tin cơ bản
        ObjectUtils.copyFields(cinemaRequest, cinema);
        cinema.setSlug(generateSlug(cinemaRequest.getName()));

//        List<CinemaImages> cinemaImages = cinemaImageRespository.findCinemaImagesByCinema_Id(cinema.getId());

        List<CinemaImages> existingImages = cinemaImageRespository.findCinemaImagesByCinema_Id(cinema.getId());
        handleImageDeletion(cinemaRequest, existingImages);

        cinema.setImages(new ArrayList<>());
        cinemaRespository.save(cinema);

//        if (cinemaRequest.getImages() != null) {
//            List<Integer> newImageUrls = cinemaRequest.getImages();
//
//            List<CinemaImages> imagesToDelete = cinemaImages.stream()
//                    .filter(images -> !newImageUrls.contains(images.getUid()))
//                    .peek(images -> {
//                        images.setCinema(null);
//
//                        try {
//                            fileStorageServiceImpl.deleteFile(images.getUrl());
//                        } catch (IOException e) {
//                            throw new RuntimeException(e);
//                        }
//                    }).collect(Collectors.toList());
//
//            cinemaImageRespository.deleteAll(imagesToDelete);
//        } else {
//            cinemaImages.forEach(images -> {
//                images.setCinema(null);
//                try {
//                    fileStorageServiceImpl.deleteFile(images.getUrl());
//                } catch (IOException e) {
//                    throw new RuntimeException(e);
//                }
//            });
//            cinemaImageRespository.deleteAll(cinemaImages);
//        }

        if (cinemaRequest.getFiles() != null) {
            updateImages(cinemaRequest.getFiles(), cinema);
//            List<MultipartFile> files = cinemaRequest.getFiles();

//            List<CompletableFuture<String>> futureUrls = fileStorageServiceImpl.uploadFilesAsync(files, "cinemas");
//            List<String> urls = futureUrls.stream().map(CompletableFuture::join).collect(Collectors.toList());

//            List<CinemaImages> newImages = new ArrayList<>();
//            for (String url : urls) {
//
//                CinemaImages Images = CinemaImages.builder()
//                        .url(url)
//                        .cinema(cinema)
//                        .build();
//
//                newImages.add(Images);
//
//            }
//
//            cinemaImageRespository.saveAll(newImages);
        }

        return true;
    }

    private void handleImageDeletion(CinemaRequest request, List<CinemaImages> existingImages) {
        List<CinemaImages> imagesToDelete;

        if (request.getImages() != null) {
            List<Integer> newImageUids = request.getImages();
            imagesToDelete = existingImages.stream()
                    .filter(image -> !newImageUids.contains(image.getUid()))
                    .peek(image -> unlinkAndDeleteImage(image))
                    .collect(Collectors.toList());
        } else {
            imagesToDelete = existingImages.stream()
                    .peek(this::unlinkAndDeleteImage)
                    .collect(Collectors.toList());
        }

        cinemaImageRespository.deleteAll(imagesToDelete);
    }

    private void unlinkAndDeleteImage(CinemaImages image) {
        image.setCinema(null);
        try {
            fileStorageServiceImpl.deleteFile(image.getUrl());
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image file: " + image.getUrl(), e);
        }
    }


    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
    }

    private void updateImages(List<MultipartFile> fileImages, Cinema cinema) {
        List<CompletableFuture<String>> futureUrls = fileStorageServiceImpl.uploadFilesAsync(fileImages, "cinemas");
        List<String> urls = futureUrls.stream().map(CompletableFuture::join).collect(Collectors.toList());
        List<CinemaImages> newImages = new ArrayList<>();
        for (String url : urls) {
            CinemaImages Images = CinemaImages.builder()
                    .url(url)
                    .cinema(cinema)
                    .build();

            newImages.add(Images);
        }

        cinemaImageRespository.saveAll(newImages);
    }

    @Override
    public Cinema findCinemaById(Integer id) {
        return cinemaRespository.findById(id)
                .orElseThrow(() -> new AppException(NOT_FOUND));
    }

    @Override
    @Transactional
    public boolean createCinema(CinemaRequest cinemaRequest) throws IOException {

        if (cinemaRespository.findCinemaByName(cinemaRequest.getName()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        Cinema cinema = new Cinema();
        ObjectUtils.copyFields(cinemaRequest, cinema);
        cinema.setSlug(generateSlug(cinemaRequest.getName()));

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
