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
@RequestMapping("/api/home/v1/home")
@Tag(name = "Home Controller")
public class HomeController {
    @Autowired
    private HomeService homeService;

    @GetMapping()
    private APIResponse<HomeResponse> getHomePage(){
        HomeResponse info = homeService.getHomeInfo();
        APIResponse<HomeResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(info);
        return apiResponse;
    }
}
