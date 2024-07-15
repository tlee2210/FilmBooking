package com.cinemas.service.admin;

import com.cinemas.dto.request.BookingSearchRequest;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.response.BookingTableResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

public interface BookingService {
    Page<BookingTableResponse> getAllMovie(BookingSearchRequest searchRequest);
}
