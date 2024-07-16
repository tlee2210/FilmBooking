package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.HomeCarouselResponse;
import com.cinemas.dto.response.bookTicketsResponse;
import com.cinemas.service.home.HomeCarouselService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home/v1/carousel")
@Tag(name = "Home Carousel Controller")
public class HomeCarouselController {
    @Autowired
    private HomeCarouselService homeCarouselService;

    @GetMapping()
    public APIResponse<HomeCarouselResponse> getCarousel() {

        APIResponse<HomeCarouselResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeCarouselService.getHomeCarousel());

        return apiResponse;
    }
}
