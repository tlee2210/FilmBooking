package com.cinemas.service.admin;

import com.cinemas.dto.request.MovieBlogRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.entities.MovieBlog;
import org.springframework.data.domain.Page;

public interface MovieBlogService {
    Page<MovieBlog> getAllBlog(PaginationHelper paginationHelper);

    boolean addBlog(MovieBlogRequest movieBlogRequest);

    MovieBlog getEditBlog(String slug);

    boolean updateBlog(MovieBlogRequest movieBlogRequest);
}
