package com.cinemas.controller.admin;

import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Movie;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.MovieService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/movie")
@Tag(name = "Movie Controller")
public class MovieController {
    @Autowired
    private MovieService movieService;

    /**
     *
     * @param PaginationHelper
     * @return
     */
    @PostMapping
    public APIResponse<Page<Movie>> getMovie(@RequestBody(required = false) PaginationHelper PaginationHelper) {
        Page<Movie> movieList = movieService.getAllMovie(PaginationHelper);
        APIResponse<Page<Movie>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    /**
     *
     * @return
     */
    @GetMapping("/create")
    public APIResponse<List<SelectOptionReponse>> getCreateMovie(){
        List<SelectOptionReponse> multiList = movieService.getCreateMovie();
        APIResponse<List<SelectOptionReponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(multiList);

        return apiResponse;
    }

    /**
     *
     * @param movieRequest
     * @return
     * @throws IOException
     */
    @PostMapping("/create")
    public APIResponse<String> createMovie(@ModelAttribute MovieRequest movieRequest) throws IOException {
        boolean checkCreate = movieService.addMovie(movieRequest);
        if(checkCreate){
            APIResponse<String> apiResponse = new APIResponse<>();
            apiResponse.setCode(200);
            apiResponse.setResult("Movie created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @DeleteMapping("/delete/{slug}")
    public APIResponse<Integer> deleteMovie(@PathVariable String slug) throws IOException {
        int id = movieService.deleteMovie(slug);
        if(id > 0){
            APIResponse<Integer> apiResponse = new APIResponse<>();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie deleted successfully");
            apiResponse.setResult(id);
            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }
}
