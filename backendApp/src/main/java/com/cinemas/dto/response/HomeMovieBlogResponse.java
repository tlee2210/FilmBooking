package com.cinemas.dto.response;

import com.cinemas.entities.MovieBlog;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HomeMovieBlogResponse {
    private MovieBlog movieBlog;
    private List<MovieBlog> blogRelate;
}
