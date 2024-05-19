package com.cinemas.service.admin;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

public interface MovieService {
    Page<Movie> getAllMovie(PaginationHelper paginationHelper);
}
