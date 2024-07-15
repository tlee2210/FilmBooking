package com.cinemas.service.home;

import com.cinemas.dto.request.VoucherApplyRequest;
import com.cinemas.dto.response.*;

import java.time.LocalDate;

public interface HomeBookingService {
    bookTicketsResponse getTimeForMovie(String slug, String city, String cinema);

    ShowTimeTableResponse getBookingTime(Integer id);

    BuyTicketResponse getInfoTicket(String slugmovie, String slugcinema, LocalDate date);

    VoucherResponse findByCode(VoucherApplyRequest code);

    SeatBookedResponse getBookedSeats(Integer id);
}
