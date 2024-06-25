package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.service.home.HomeBookingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home/v1/booking")
@Tag(name = "Home Booking Controller")
public class HomeBookingController {
    @Autowired
    HomeBookingService homeBookingService;

    @GetMapping
    public APIResponse<?> getTimeForMovie(
            @RequestParam(required = false) String slug,
            @RequestParam(required = false) String city
            ) {
        APIResponse<Object> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeBookingService.getTimeForMovie(slug,city));

        return apiResponse;
    }
}
