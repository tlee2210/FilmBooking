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
import java.util.List;

@RequestMapping("/api/home/v1/movie")
@RestController
@Tag(name = "Home Movie Controller")
public class HomeMovieController {
    @Autowired
    private HomeMovieSerivce homeMovieSerivce;

    @GetMapping("/active")
    public APIResponse<List<Movie>> getMovieActive() {
        List<Movie> movieList = homeMovieSerivce.getMovieActive();
        APIResponse<List<Movie>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/soon")
    public APIResponse<List<Movie>> getMovieSoon() {
        List<Movie> movieList = homeMovieSerivce.getMovieSoon();
        APIResponse<List<Movie>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/detail/{slug}")
    public APIResponse<Movie> getMovieBySlug(@PathVariable String slug) throws IOException {
        APIResponse<Movie> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homeMovieSerivce.getMoiveBySlug(slug));

        return apiResponse;
    }

    @GetMapping("/coming-soon")
    public APIResponse<List<Movie>> getRandomMovie() {
        APIResponse<List<Movie>> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homeMovieSerivce.getListMovieSoon());

        return apiResponse;
    }

    @GetMapping("/full-active")
    public APIResponse<List<Movie>> getMovieActiveNoLimit() {
        List<Movie> movieList = homeMovieSerivce.getMovieActiveNoLimit();
        APIResponse<List<Movie>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/full-soon")
    public APIResponse<List<Movie>> getMovieSoonNoLimit() {
        List<Movie> movieList = homeMovieSerivce.getMovieSoonNoLimit();
        APIResponse<List<Movie>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }
}
