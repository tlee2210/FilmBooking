package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieBlog;
import com.cinemas.entities.Review;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeResponse {
    List<Movie> movieShowingList;
    List<Movie> movieSoonList;
    List<MovieBlog> movieBlogList;
    List<Review> reviewList;
}
