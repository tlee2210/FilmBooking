package com.cinemas.dto.request;

import com.cinemas.enums.MovieStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchCelebRequest extends PaginationHelper{
    private Integer countryId;

    public SearchCelebRequest(Integer countryId, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.countryId = countryId;
    }
}
