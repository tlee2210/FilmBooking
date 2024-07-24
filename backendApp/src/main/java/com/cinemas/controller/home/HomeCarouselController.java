package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.service.home.HomeCarouselService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/home/carousel")
@Tag(name = "Home Carousel Controller")
public class HomeCarouselController {
    @Autowired
    private HomeCarouselService homeCarouselService;

    @GetMapping("/v1")
    public APIResponse<List<SelectOptionReponse>> getCarousel() {

        APIResponse<List<SelectOptionReponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(homeCarouselService.getHomeCarousel());

        return apiResponse;
    }
}
