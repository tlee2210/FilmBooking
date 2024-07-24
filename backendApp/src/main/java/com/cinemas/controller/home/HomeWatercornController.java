package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.WaterCorn;
import com.cinemas.service.home.HomeWatercornService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/home/watercorn")
@Tag(name = "Home water corn Controller")
public class HomeWatercornController {
    @Autowired
    private HomeWatercornService homeWatercornService;

    @GetMapping("/v1")
    public APIResponse<List<WaterCorn>> getAll() {
        APIResponse<List<WaterCorn>> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(homeWatercornService.getWatercorn());

        return apiResponse;
    }
}
