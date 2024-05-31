package com.cinemas.controller.admin;

import com.cinemas.dto.request.MovieRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionMovie;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.MovieService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/movie")
@Tag(name = "Movie Controller")
public class MovieController {
    @Autowired
    private MovieService movieService;

    /**
     * get list and search list Movie
     * @param name
     * @param countryId
     * @param status
     * @param pageNo
     * @param pageSize
     * @param sort
     * @return
     */
    @GetMapping
    public APIResponse<SelectOptionAndModelReponse<Page<Movie>>> getMovie(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer countryId,
            @RequestParam(required = false) MovieStatus status,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort
            ) {
        SearchMovie searchMovie = new SearchMovie(name, countryId, status, pageNo - 1, pageSize, sort);
        SelectOptionAndModelReponse<Page<Movie>> movieList = movieService.getAllMovie(searchMovie);
        APIResponse<SelectOptionAndModelReponse<Page<Movie>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieList);

        return apiResponse;
    }

    /**
     * @return
     */
    @GetMapping("/create")
    public APIResponse<SelectOptionMovie<?>> getCreateMovie() {
        SelectOptionMovie<?> multiList = movieService.getCreateMovie();
        APIResponse<SelectOptionMovie<?>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(multiList);

        return apiResponse;
    }

    /**
     * @param movieRequest
     * @return
     * @throws IOException
     */
    @PostMapping("/create")
    public APIResponse<String> createMovie(@ModelAttribute MovieRequest movieRequest) throws IOException {
        boolean checkCreate = movieService.addMovie(movieRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse<>();
            apiResponse.setCode(200);
            apiResponse.setResult("Movie created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    /**
     * delete Movie by slug
     *
     * @param slug
     * @return
     * @throws IOException
     */

    @DeleteMapping("/delete/{slug}")
    public APIResponse<Integer> deleteMovie(@PathVariable String slug) throws IOException {
        int id = movieService.deleteMovie(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse<>();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie deleted successfully");
            apiResponse.setResult(id);
            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{slug}/edit")
    public APIResponse<SelectOptionMovie<Movie>> getMovieBySlug(@PathVariable String slug) throws IOException {
        APIResponse<SelectOptionMovie<Movie>> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(movieService.getEditCelebrityBySlug(slug));

        return apiResponse;
    }

    @PutMapping("/update")
    public APIResponse<String> updateMovie(@ModelAttribute MovieRequest movieRequest) throws IOException {
        boolean checkUpdate = movieService.updateMovie(movieRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse<>();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie updated successfully");
            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }
}
