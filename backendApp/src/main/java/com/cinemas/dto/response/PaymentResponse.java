package com.cinemas.dto.response;

import com.cinemas.entities.BookingWaterCorn;
import com.cinemas.entities.Showtimes;
import com.cinemas.entities.User;
import com.cinemas.enums.PaymentType;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PaymentResponse {
    private Integer id;

    private String quantitySeat;

    private String quantityDoubleSeat;

    private Float totalPrice;

    private PaymentType paymentType;

    private ShowTimeTableResponse showtime;

    private LocalDate createAt;

    private List<BookingWaterCornResponse> bookingWaterCorn;
}
