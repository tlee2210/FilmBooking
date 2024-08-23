package com.cinemas.controller.home;

import com.cinemas.dto.request.VoucherApplyRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Showtimes;
import com.cinemas.entities.Voucher;
import com.cinemas.service.home.HomeBookingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/home/booking")
@Tag(name = "Home Booking Controller")
public class HomeBookingController {
    @Autowired
    HomeBookingService homeBookingService;

    @GetMapping("/v1")
    public APIResponse<?> getTimeForMovie(
            @RequestParam(required = false) String slug,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String cinema
    ) {

        APIResponse<bookTicketsResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeBookingService.getTimeForMovie(slug, city, cinema));

        return apiResponse;
    }
    @GetMapping("/v1/{id}")
    public APIResponse<ShowTimeTableResponse> getBookingTime(@PathVariable Integer id){
        APIResponse<ShowTimeTableResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeBookingService.getBookingTime(id));
        return apiResponse;
    }

    @GetMapping("/v1/buy-ticket")
    public APIResponse<BuyTicketResponse> getTicketInfo(
            @RequestParam(required = false) String slugmovie,
            @RequestParam(required = false) String slugcinema,
            @RequestParam(required = false) LocalDate time) {
        BuyTicketResponse buyTicket = homeBookingService.getInfoTicket(slugmovie, slugcinema, time);
        APIResponse<BuyTicketResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(buyTicket);
        return apiResponse;
    }

    @PostMapping("/v1/apply-voucher")
    public APIResponse<VoucherResponse> applyVoucher(@RequestBody VoucherApplyRequest code){
        System.out.println(code);
        APIResponse<VoucherResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeBookingService.findByCode(code));

        return apiResponse;
    }

    @GetMapping("/v1/seat-booked/{id}")
    public APIResponse<SeatBookedResponse> getSeatBooked(@PathVariable Integer id){
        APIResponse<SeatBookedResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeBookingService.getBookedSeats(id));
        return apiResponse;
    }

    @GetMapping("/v1/bookings")
    public APIResponse<BookingTicketResponse> getBookingTicket(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String movie
    ){
        APIResponse<BookingTicketResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeBookingService.getBookingTicket(city, movie));
        return apiResponse;
    }
}
