package com.cinemas.dto.request;

import com.cinemas.enums.ReviewType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchReviewRequest extends PaginationHelper{
    public ReviewType type;

    public SearchReviewRequest(ReviewType type,Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.type = type;
    }
}
