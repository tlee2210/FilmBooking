package com.cinemas.controller.admin;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.entities.Movie;
import com.cinemas.service.admin.MovieService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/admin/v1/movie")
@Tag(name = "Movie Controller")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @PostMapping()
    public APIResponse<Page<Movie>> getMovie(@RequestBody(required = false) PaginationHelper PaginationHelper) {
        Page<Movie> movieList = movieService.getAllMovie(PaginationHelper);
        APIResponse<Page<Movie>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }
}
