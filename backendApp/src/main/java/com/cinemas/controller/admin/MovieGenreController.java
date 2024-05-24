package com.cinemas.controller.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.MovieGenre;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.MovieGenreService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/movie-genre")
@Tag(name = "Movie Genre Controller")
public class MovieGenreController {
    @Autowired
    private MovieGenreService movieGenreService;

    @PostMapping
    public APIResponse<Page<MovieGenre>> getAllMovieGenres(@RequestBody(required = false) SearchRequest searchRequest) {
        Page<MovieGenre> movieGenres = movieGenreService.getAllMovieGenre(searchRequest);
        APIResponse<Page<MovieGenre>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieGenres);

        return apiResponse;
    }

    @PostMapping(value = "/create")
    public APIResponse<String> createMovieGenre(@RequestBody MovieGenreRequest movieGenreRequest){
        boolean checkCreate = movieGenreService.addMovieGenre(movieGenreRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie Genre created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{slug}/edit")
    public APIResponse<MovieGenre> getMovieGenreById(@PathVariable String slug) {
        APIResponse<MovieGenre> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(movieGenreService.getEditMovieGenreBySlug(slug));

        return apiResponse;
    }

    @PutMapping(value = "/update")
    public APIResponse<String> updateMovieGenre(@ModelAttribute MovieGenreRequest movieGenreRequest){
        boolean checkUpdate = movieGenreService.updateMovieGenre(movieGenreRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie Genre Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    @DeleteMapping("/{slug}/delete")
    public APIResponse<Integer> deleteMovieGenre(@PathVariable String slug){

        int id = movieGenreService.deleteMovieGenre(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted Movie Genre");
            apiResponse.setResult(id);

            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }
}
