package com.cinemas.dto.request;

import lombok.Data;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;

@Data
public class searchShowTimeRequest extends PaginationHelper {
    public String cinema;
    public LocalDate startDay;
    public LocalDate endDay;

    public searchShowTimeRequest(
            Integer pageNo,
            Integer pageSize,
            Sort.Direction sort,
            String cinema,
            LocalDate startDay,
            LocalDate endDay) {
        super(pageNo, pageSize, sort, "id");
        this.cinema = cinema;
        this.startDay = startDay;
        this.endDay = endDay;
    }
}
