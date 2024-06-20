package com.cinemas.service.admin;

import com.cinemas.dto.request.MovieBlogRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.entities.MovieBlog;
import org.springframework.data.domain.Page;

import java.io.IOException;

public interface MovieBlogService {
    Page<MovieBlog> getAllBlog(SearchRequest paginationHelper);

    boolean addBlog(MovieBlogRequest movieBlogRequest) throws IOException;

    MovieBlog getEditBlog(String slug);

    boolean updateBlog(MovieBlogRequest movieBlogRequest) throws IOException;

    Integer deleteBlog(String slug) throws IOException;
}
