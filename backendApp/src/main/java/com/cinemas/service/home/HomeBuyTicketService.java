package com.cinemas.service.home;

import com.cinemas.dto.response.BuyTicketResponse;

import java.time.LocalDate;
import java.time.LocalTime;

public interface HomeBuyTicketService {
    BuyTicketResponse getInfoTicket(String slugmovie, String slugcinema, LocalDate date);
}
