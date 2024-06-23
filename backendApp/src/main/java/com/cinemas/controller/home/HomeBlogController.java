package com.cinemas.controller.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchCelebRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionCeleb;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.MovieBlog;
import com.cinemas.service.home.HomeBlogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home/v1/blog")
@Tag(name = "Home Movie Blog Controller")
public class HomeBlogController {
    @Autowired
    private HomeBlogService homeBlogService;

    @GetMapping
    public APIResponse<Page<MovieBlog>> getAllBlog(
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort
    ) {
        PaginationHelper paginationHelper = new PaginationHelper(pageNo - 1, pageSize, sort, "id");
        Page<MovieBlog> blogs = homeBlogService.getAllBlog(paginationHelper);
        APIResponse<Page<MovieBlog>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(blogs);

        return apiResponse;
    }

    @GetMapping("/detail/{slug}")
    public APIResponse<MovieBlog> getDetailMovieBlog(@PathVariable String slug) {
        APIResponse<MovieBlog> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(homeBlogService.getBlogDetail(slug));

        return apiResponse;
    }
}
