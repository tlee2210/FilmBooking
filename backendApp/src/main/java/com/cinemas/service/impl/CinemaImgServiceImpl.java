package com.cinemas.service.impl;

import com.cinemas.dto.request.CinemaImagesRequest;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.CinemaImages;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.repositories.CinemaImagesRepository;
import com.cinemas.service.CinemaImagesService;
import com.cinemas.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class CinemaImgServiceImpl implements CinemaImagesService {
    @Autowired
    private CinemaImagesRepository cinemaImagesRepository;

    @Autowired
    private CinemaService cinemaService;

    private String storeFile(String id, MultipartFile file) throws IOException {
        if (file != null) {
            String folderName = id;
            String uploadDir = "cinema_images/" + folderName;
            String absoluteUploadDir = System.getProperty("user.dir") + "/src/main/java/com/cinemas/" + uploadDir;
            Path uploadPath = Paths.get(absoluteUploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return uniqueFileName;
        }
        return "";
    }

    @Override
    public List<CinemaImages> getAllCinemaImages() {
        return cinemaImagesRepository.findAll();
    }

    @Override
    public CinemaImages getCinemaImageById(int id) {
        return cinemaImagesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid id"));
    }

    @Override
    public void addCinemaImage(CinemaImagesRequest cinemaImage, MultipartFile[] files) throws IOException {
        Cinema cinema = cinemaService.getCinemaById(cinemaImage.getCinema_id());
        if (cinema == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cinema not found");
        }
        for (MultipartFile file : files) {
            String parseId = Integer.toString(cinemaImage.getCinema_id());
            String fileName = storeFile(parseId, file);
            CinemaImages cinemaImages = new CinemaImages();
            cinemaImages.setImgName(fileName);
            cinemaImages.setCinema(cinema);
            cinemaImagesRepository.save(cinemaImages);
        }
    }

    @Override
    public void updateCinemaImage(int id, CinemaImagesRequest cinemaImage) {
        CinemaImages existingImages = getCinemaImageById(id);
        if (existingImages != null) {
            existingImages.setImgName(cinemaImage.getImgName());
            cinemaImagesRepository.save(existingImages);
        }
    }

    @Override
    public void deleteCinemaImage(int id) {
        if (cinemaImagesRepository.existsById(id)) {
            cinemaImagesRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cinema image not found");
        }
    }
}
