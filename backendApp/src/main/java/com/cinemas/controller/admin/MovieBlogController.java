package com.cinemas.controller.admin;

import com.cinemas.dto.request.MovieBlogRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.entities.MovieBlog;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.MovieBlogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/movie-blog")
@Tag(name = "Dashboard Movie Blog Controller")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class MovieBlogController {
    MovieBlogService movieBlogService;

    @GetMapping("/v1")
    public APIResponse<Page<MovieBlog>> getAllMovieBlog(
            @RequestParam(required = false) String name,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort
    ) {
        SearchRequest searchRequest = new SearchRequest(name, pageNo - 1, pageSize, sort);

//        PaginationHelper paginationHelper = new PaginationHelper(pageNo, pageSize, sort, "id");
        APIResponse<Page<MovieBlog>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(movieBlogService.getAllBlog(searchRequest));

        return apiResponse;
    }

    @PostMapping("/v1/create")
    public APIResponse<String> createMovieBlog(@ModelAttribute MovieBlogRequest movieBlogRequest) throws IOException {
        boolean checkCreate = movieBlogService.addBlog(movieBlogRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie blog created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/v1/{slug}/edit")
    public APIResponse<MovieBlog> getMovieBlogById(@PathVariable String slug) {
        APIResponse<MovieBlog> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(movieBlogService.getEditBlog(slug));

        return apiResponse;
    }

    @PutMapping("/v1/update")
    public APIResponse<String> updateMovieBlog(@ModelAttribute MovieBlogRequest movieBlogRequest) throws IOException {
        boolean checkUpdate = movieBlogService.updateBlog(movieBlogRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Movie Blog Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    @DeleteMapping("/v1/delete/{slug}")
    public APIResponse<Integer> deleteBlog(@PathVariable String slug) throws IOException {

        int id = movieBlogService.deleteBlog(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted blog");
            apiResponse.setResult(id);

            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }
}
