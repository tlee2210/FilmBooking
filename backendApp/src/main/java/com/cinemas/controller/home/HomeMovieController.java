package com.cinemas.controller.home;

import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.request.SearchMovieHome;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.service.home.HomeMovieSerivce;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequestMapping("/api/home/v1/movie")
@RestController
@Tag(name = "Home Movie Controller")
public class HomeMovieController {
    @Autowired
    private HomeMovieSerivce homeMovieSerivce;

    @GetMapping("/active")
    public APIResponse<SelectOptionAndModelReponse<Page<Movie>>> getMovieActive(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) MovieStatus status,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort
    ) {
        SearchMovieHome searchMovie = new SearchMovieHome(name, status, pageNo - 1, pageSize, sort);
        SelectOptionAndModelReponse<Page<Movie>> movieList = homeMovieSerivce.getMovieActive(searchMovie);
        APIResponse<SelectOptionAndModelReponse<Page<Movie>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/soon")
    public APIResponse<SelectOptionAndModelReponse<Page<Movie>>> getMovieSoon(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) MovieStatus status,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort
    ) {
        SearchMovieHome searchMovie = new SearchMovieHome(name, status, pageNo - 1, pageSize, sort);
        SelectOptionAndModelReponse<Page<Movie>> movieList = homeMovieSerivce.getMovieSoon(searchMovie);
        APIResponse<SelectOptionAndModelReponse<Page<Movie>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/detail/{slug}")
    public APIResponse<SelectOptionMovie<Movie>> getMovieBySlug(@PathVariable String slug) throws IOException {
        APIResponse<SelectOptionMovie<Movie>> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homeMovieSerivce.getMoiveBySlug(slug));

        return apiResponse;
    }
}
