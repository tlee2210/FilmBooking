package com.cinemas.controller;

import com.cinemas.dto.request.CinemaImagesRequest;
import com.cinemas.entities.CinemaImages;
import com.cinemas.service.CinemaImagesService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/cinema_img")
@Tag(name = "Cinema Images Controller")
public class CinemaImagesController {
    @Autowired
    private CinemaImagesService cinemaImagesService;

    @GetMapping("")
    public ResponseEntity<?> getAllCinemaImages() {
        try {
            List<CinemaImages> cinemaImagesList = cinemaImagesService.getAllCinemaImages();
            return ResponseEntity.ok(cinemaImagesList);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCinemaImageById(@PathVariable int id) {
        try {
            CinemaImages cinemaImages = cinemaImagesService.getCinemaImageById(id);
            return ResponseEntity.ok(cinemaImages);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCinemaImage(@ModelAttribute CinemaImagesRequest cinemaImagesRequest, MultipartFile[] files) throws IOException {
        try {
            cinemaImagesService.addCinemaImage(cinemaImagesRequest, files);
            return ResponseEntity.ok("Successfully added cinema image");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCinemaImage(@PathVariable int id) {
        cinemaImagesService.deleteCinemaImage(id);
        return ResponseEntity.ok("Successfully deleted Cinema image");
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCinemaImage(@ModelAttribute CinemaImagesRequest cinemaImagesRequest, @PathVariable int id) {
        cinemaImagesService.updateCinemaImage(id, cinemaImagesRequest);
        return ResponseEntity.ok("Successfully updated Cinema image");
    }
}
