package com.cinemas.service;

import com.cinemas.dto.request.CinemaImagesRequest;
import com.cinemas.entities.CinemaImages;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CinemaImagesService {
    List<CinemaImages> getAllCinemaImages();
    CinemaImages getCinemaImageById(int id);
    void addCinemaImage(CinemaImagesRequest cinemaImage, MultipartFile[] files) throws IOException;
    void updateCinemaImage(int id, CinemaImagesRequest cinemaImage);
    void deleteCinemaImage(int id);
}
