package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.ShowTimeTableResponse;
import com.cinemas.dto.response.bookTicketsResponse;
import com.cinemas.entities.Showtimes;
import com.cinemas.service.home.HomeBookingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home/v1/booking")
@Tag(name = "Home Booking Controller")
public class HomeBookingController {
    @Autowired
    HomeBookingService homeBookingService;

    @GetMapping
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
    @GetMapping("/{id}")
    public APIResponse<ShowTimeTableResponse> getBookingTime(@PathVariable Integer id){
        APIResponse<ShowTimeTableResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeBookingService.getBookingTime(id));
        return apiResponse;
    }
}
