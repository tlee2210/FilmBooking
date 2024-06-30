package com.cinemas.controller.home;

import com.cinemas.dto.request.SearchFilmRequest;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.HomeFilmResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
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
@RequestMapping("/api/home/v1/film")
@Tag(name = "Home Film Controller")
public class HomeFilmController {
    @Autowired
    private HomeFilmService homeFilmService;

    @GetMapping()
    public APIResponse<SelectOptionAndModelReponse<Page<Movie>>> getFilms(
            @RequestParam(required = false) Integer genreId,
            @RequestParam(required = false) Integer countryId,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) MovieStatus status,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort
    ) {
        SearchFilmRequest searchFilmRequest = new SearchFilmRequest(genreId, countryId, year, status,pageNo - 1, pageSize, sort);
        SelectOptionAndModelReponse<Page<Movie>> movieList = homeFilmService.getAllFilms(searchFilmRequest);
        APIResponse<SelectOptionAndModelReponse<Page<Movie>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    @GetMapping("/detail/{slug}")
    public APIResponse<HomeFilmResponse> getFilmDetail(@PathVariable String slug){
        APIResponse<HomeFilmResponse> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homeFilmService.getFilmDetail(slug));

        return apiResponse;
    }
}
