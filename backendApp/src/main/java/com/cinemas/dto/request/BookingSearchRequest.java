package com.cinemas.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingSearchRequest extends PaginationHelper{
    private String userName;

    private LocalDate startDate;

    private LocalDate endDate;

    private String movieName;

    public BookingSearchRequest(String userName, LocalDate startDate, LocalDate endDate, String movieName, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.userName = userName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.movieName = movieName;
    }
}
