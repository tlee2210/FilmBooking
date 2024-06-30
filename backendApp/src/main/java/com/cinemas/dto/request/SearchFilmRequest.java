package com.cinemas.dto.request;

import com.cinemas.entities.Country;
import com.cinemas.entities.MovieGenre;
import com.cinemas.enums.MovieStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchFilmRequest extends PaginationHelper{
    private Integer genreId;
    private Integer countryId;
    private String year;
    private MovieStatus status;

    public SearchFilmRequest(Integer genreId, Integer countryId, String year, MovieStatus status, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.genreId = genreId;
        this.countryId = countryId;
        this.year = year;
        this.status = status;
    }
}
