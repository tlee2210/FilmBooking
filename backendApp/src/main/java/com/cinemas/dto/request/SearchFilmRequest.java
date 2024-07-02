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
public class SearchFilmRequest extends PaginationHelper {
    private String category;
    private String country;
    private String year;
    private MovieStatus status;

    public SearchFilmRequest(String category, String country, String year, MovieStatus status, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.category = category;
        this.country = country;
        this.year = year;
        this.status = status;
    }
}
