package com.cinemas.dto.response;

import com.cinemas.enums.MovieFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingSuccessInfo {
    private Integer id;
    private String orderId;
    private String paymentId;
    private String cinemaName;
    private String movieName;
    private String roomName;
    private LocalTime Time;
    private LocalDate date;
    private String quantitySeat;
    private String quantityDoubleSeat;
    private MovieFormat movieFormat;
    private List<waterCornBookingResponse> bookingWaterCorn;
    private Float totalPrice;
}
