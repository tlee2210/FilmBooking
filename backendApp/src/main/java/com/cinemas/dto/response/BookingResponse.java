package com.cinemas.dto.response;

import com.cinemas.enums.MovieFormat;
import com.cinemas.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Integer id;
    private String Image;
    private String rules;
    private String movieName;
    private MovieFormat movieFormat;
    private String cinemaName;
    private String roomName;
    private LocalTime ShowTime;
    private LocalDate ShowTimeDate;
    private PaymentType paymentType;
    private String quantitySeat;
    private String quantityDoubleSeat;
    private Float totalPrice;
    private List<waterCornBookingResponse> bookingWaterCorn;
    private LocalDate bookingDate;

    public BookingResponse(Integer id, String image, String rules,String movieName, MovieFormat movieFormat, String cinemaName, String roomName, LocalTime showTime, LocalDate showTimeDate, PaymentType paymentType, String quantitySeat, String quantityDoubleSeat, Float totalPrice, LocalDate bookingDate) {
        this.id = id;
        this.Image = image;
        this.rules = rules;
        this.movieName = movieName;
        this.movieFormat = movieFormat;
        this.cinemaName = cinemaName;
        this.roomName = roomName;
        this.ShowTime = showTime;
        this.ShowTimeDate = showTimeDate;
        this.paymentType = paymentType;
        this.quantitySeat = quantitySeat;
        this.quantityDoubleSeat = quantityDoubleSeat;
        this.totalPrice = totalPrice;
        this.bookingDate = bookingDate;
    }
}
