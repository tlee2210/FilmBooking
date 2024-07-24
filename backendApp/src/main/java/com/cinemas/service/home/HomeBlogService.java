package com.cinemas.service.home;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.HomeMovieBlogResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.MovieBlog;
import org.springframework.data.domain.Page;

import java.util.List;


public interface HomeBlogService {
    Page<MovieBlog> getAllBlog(PaginationHelper paginationHelper);

    HomeMovieBlogResponse getBlogDetail(String slug);
<<<<<<< Updated upstream

    List<MovieBlog> getAllBlog2(String name);
=======
<<<<<<< HEAD
    void incrementViewCount(String slug);

=======

    List<MovieBlog> getAllBlog2(String name);
>>>>>>> 0b1c4d9c5f405c9dd795ada8ea1865811daec8cd
>>>>>>> Stashed changes
}
