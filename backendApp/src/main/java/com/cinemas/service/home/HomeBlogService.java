package com.cinemas.service.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.HomeMovieBlogResponse;
import com.cinemas.entities.MovieBlog;
import org.springframework.data.domain.Page;


public interface HomeBlogService {
    Page<MovieBlog> getAllBlog(PaginationHelper paginationHelper);

    HomeMovieBlogResponse getBlogDetail(String slug);
}
