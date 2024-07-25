package com.cinemas.controller.home;

import com.cinemas.dto.response.*;
import com.cinemas.entities.Movie;
import com.cinemas.service.home.HomeMovieSerivce;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/home/movie")
@RestController
@Tag(name = "Home Movie Controller")
public class HomeMovieController {
    @Autowired
    private HomeMovieSerivce homeMovieSerivce;

    @GetMapping("/v1/active/introduce")
    public APIResponse<List<ItemIntroduce>> getMovieActiveLimitIntroduce() {
        List<ItemIntroduce> movieList = homeMovieSerivce.getMovieActiveLimitIntroduce();
        APIResponse<List<ItemIntroduce>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/v1/detail/{slug}")
    public APIResponse<Movie> getMovieBySlug(@PathVariable String slug) throws IOException {
        APIResponse<Movie> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homeMovieSerivce.getMoiveBySlug(slug));

        return apiResponse;
    }


    @GetMapping("/v1")
    public APIResponse<HomeResponse> getAllMovie() {
        HomeResponse HomeResponse = homeMovieSerivce.getAllMovie();
        APIResponse<HomeResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(HomeResponse);

        return apiResponse;
    }

    @GetMapping("/v2")
    public APIResponse<HomeResponse2> getAllMovie2() {
        HomeResponse2 HomeResponse = homeMovieSerivce.getAllMovie2();
        APIResponse<HomeResponse2> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(HomeResponse);

        return apiResponse;
    }
}
