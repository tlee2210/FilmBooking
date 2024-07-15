package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.ProfileResponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.service.home.ProfileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/home/v1/profile")
@RestController
@Tag(name = "Home Profile Controller")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @GetMapping
    public APIResponse<ProfileResponse> getProfile() {
        APIResponse<ProfileResponse> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(profileService.getProfile());

        return apiResponse;
    }
}
