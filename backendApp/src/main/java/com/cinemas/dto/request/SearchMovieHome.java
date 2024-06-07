package com.cinemas.dto.request;

import com.cinemas.enums.MovieStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchMovieHome extends PaginationHelper{
    private String name;
    private MovieStatus movieStatus;

    public SearchMovieHome(String name, MovieStatus movieStatus, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.name = name;
        this.movieStatus = movieStatus;
    }
}
