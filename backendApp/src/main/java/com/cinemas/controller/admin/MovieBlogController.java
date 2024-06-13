package com.cinemas.controller.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.MovieBlogRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.MovieBlog;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.MovieBlogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/movie-blog")
@Tag(name = "Dashboard Movie Blog Controller")
public class MovieBlogController {
    @Autowired
    private MovieBlogService movieBlogService;

    @GetMapping
    public APIResponse<Page<MovieBlog>> getAllMovieBlog(
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort
    ){
        PaginationHelper paginationHelper = new PaginationHelper(pageNo, pageSize, sort, "id");
        APIResponse<Page<MovieBlog>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieBlogService.getAllBlog(paginationHelper));

        return apiResponse;
    }

    @PostMapping("/create")
    public APIResponse<String> createMovieBlog(@RequestBody MovieBlogRequest movieBlogRequest) {
        boolean checkCreate = movieBlogService.addBlog(movieBlogRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie blog created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{slug}/edit")
    public APIResponse<MovieBlog> getMovieBlogById(@PathVariable String slug) {
        APIResponse<MovieBlog> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(movieBlogService.getEditBlog(slug));

        return apiResponse;
    }

    @PutMapping( "/update")
    public APIResponse<String> updateMovieBlog(@RequestBody MovieBlogRequest movieBlogRequest){
        boolean checkUpdate = movieBlogService.updateBlog(movieBlogRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie Blog Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }
}
