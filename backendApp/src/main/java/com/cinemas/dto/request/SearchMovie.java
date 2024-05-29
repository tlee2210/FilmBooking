package com.cinemas.dto.request;

import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.StatusCinema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchMovie extends PaginationHelper{
    private String name;
    private Integer countryId;
    private MovieStatus movieStatus;

    public SearchMovie(String name, Integer countryId, MovieStatus movieStatus, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.name = name;
        this.countryId = countryId;
        this.movieStatus = movieStatus;
    }
}
