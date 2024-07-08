package com.cinemas.service.home;

import com.cinemas.dto.response.BuyTicketResponse;
import com.cinemas.dto.response.ShowTimeTableResponse;
import com.cinemas.dto.response.bookTicketsResponse;

import java.time.LocalDate;

public interface HomeBookingService {
    bookTicketsResponse getTimeForMovie(String slug, String city, String cinema);

    ShowTimeTableResponse getBookingTime(Integer id);

    BuyTicketResponse getInfoTicket(String slugmovie, String slugcinema, LocalDate date);
}
