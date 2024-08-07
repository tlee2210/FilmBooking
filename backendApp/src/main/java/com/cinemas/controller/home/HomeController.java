package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.HomeResponse;
import com.cinemas.service.home.HomeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home/home")
@Tag(name = "Home Controller")
public class HomeController {
    @Autowired
    private HomeService homeService;

    @GetMapping("/v1")
    private APIResponse<HomeResponse> getHomePage(){
        HomeResponse info = homeService.getHomeInfo();
        APIResponse<HomeResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(info);
        return apiResponse;
    }

    @GetMapping("/v1/navbar")
    private APIResponse<HomeResponse> getNavbarPage(){
        HomeResponse info = homeService.getNavbarInfo();
        APIResponse<HomeResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(info);
        return apiResponse;
    }
}
