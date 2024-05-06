package com.cinemas.controller;

import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.entities.Cinema;
import com.cinemas.service.CinemaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/cinema")
@Tag(name = "Cinema Controller")
public class CinemaController {
    @Autowired
    private CinemaService cinemaService;

    @GetMapping("")
    public ResponseEntity<?> listCinema() {
        try {
            List<Cinema> cinemaList = cinemaService.getAllCinemas();
            return ResponseEntity.ok(cinemaList);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCinemaById(@PathVariable int id) {
        try {
            Cinema cinema = cinemaService.getCinemaById(id);
            return ResponseEntity.ok(cinema);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCinema(@ModelAttribute CinemaRequest cinema) {
        try {
            cinemaService.addCinema(cinema);
            return ResponseEntity.ok(cinema);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCinema(@PathVariable int id) {
        try {
            cinemaService.deleteCinema(id);
            return ResponseEntity.ok("Deleted Cinema");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCinema(@ModelAttribute CinemaRequest cinema, @PathVariable int id) {
        try {
            cinemaService.updateCinema(id, cinema);
            return ResponseEntity.ok("Updated Cinema");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
