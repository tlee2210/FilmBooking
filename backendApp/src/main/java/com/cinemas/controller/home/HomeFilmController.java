package com.cinemas.controller.home;

import com.cinemas.dto.request.SearchFilmRequest;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.service.home.HomeFilmService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/home/movie-genre")
@Tag(name = "Home Movie Genre Controller")
public class HomeFilmController {
    @Autowired
    private HomeFilmService homeFilmService;

    @GetMapping("/v1")
    public APIResponse<SelectOptionAndModelReponse<Page<ItemIntroduce>>> getFilms(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) MovieStatus status,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort
    ) {
        SearchFilmRequest searchFilmRequest = new SearchFilmRequest(category, country, year, status,pageNo - 1, pageSize, sort);
        SelectOptionAndModelReponse<Page<ItemIntroduce>> movieList = homeFilmService.getAllFilms(searchFilmRequest);
        APIResponse<SelectOptionAndModelReponse<Page<ItemIntroduce>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/v1/detail/{slug}")
    public APIResponse<HomeFilmResponse> getFilmDetail(@PathVariable String slug){
        APIResponse<HomeFilmResponse> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homeFilmService.getFilmDetail(slug));

        return apiResponse;
    }
}
