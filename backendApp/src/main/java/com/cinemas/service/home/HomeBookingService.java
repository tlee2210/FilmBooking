package com.cinemas.service.home;

import com.cinemas.dto.response.ShowTimeTableResponse;
import com.cinemas.dto.response.bookTicketsResponse;

public interface HomeBookingService {
    bookTicketsResponse getTimeForMovie(String slug, String city, String cinema);

    ShowTimeTableResponse getBookingTime(Integer id);
}
