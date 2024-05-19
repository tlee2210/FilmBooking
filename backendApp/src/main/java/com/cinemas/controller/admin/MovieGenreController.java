package com.cinemas.controller.admin;

import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.entities.MovieGenre;
import com.cinemas.service.admin.MovieGenreService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/v1/movie-genre")
@Tag(name = "Movie Genre Controller")
public class MovieGenreController {
    @Autowired
    private MovieGenreService movieGenreService;

    @GetMapping("")
    public ResponseEntity<List<MovieGenre>> getAllMovieGenres() {
        List<MovieGenre> movieGenres = movieGenreService.getAllGenres();
        return ResponseEntity.ok(movieGenres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieGenre> getMoviceGenre(@PathVariable int id) {
        MovieGenre movieGenre = movieGenreService.getGenreById(id);
        return ResponseEntity.ok(movieGenre);
    }

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createMovieGenre(@ModelAttribute MovieGenreRequest movieGenreRequest) {
        try {
            movieGenreService.saveGenre(movieGenreRequest);
            return ResponseEntity.ok("Created successfully");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMovieGenre(@PathVariable int id) {
        try {
            movieGenreService.deleteGenre(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateMovieGenre(@PathVariable int id, @ModelAttribute MovieGenreRequest movieGenreRequest) {
        try {
            movieGenreService.updateGenre(id, movieGenreRequest);
            return ResponseEntity.ok("Updated successfully");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
