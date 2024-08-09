package com.cinemas.controller.home;

import com.cinemas.dto.request.ChangePasswordRequest;
import com.cinemas.dto.request.ProfileRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.exception.AppException;
import com.cinemas.service.home.HomeUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RequestMapping("/api/home/user")
@RestController
@Tag(name = "Home User Controller")
public class HomeUserController {
    @Autowired
    private HomeUserService userService;

    @GetMapping(value = "/v1/profile")
    public APIResponse<UserResponse> getUserProfile() {
        APIResponse<UserResponse> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(userService.getUserProfile());

        return apiResponse;
    }

    @PutMapping(value = "/v1/update")
    public APIResponse<String> updateUser(@RequestBody ProfileRequest profileRequest) {
        System.out.println("================");
        System.out.println(profileRequest);
        System.out.println("================");
        boolean checkUpdate = userService.updateUser(profileRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("User Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    @PostMapping(value = "/v1/change-password")
    public APIResponse<String> changePassword(@RequestBody ChangePasswordRequest changePassword) {
        boolean changePass = userService.changePassword(changePassword);
        if (changePass) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Change password successfully");

            return apiResponse;
        }
        throw new AppException(UPDATE_FAILED);
    }

    @PostMapping(value = "/v1/upload-avatar")
    public APIResponse<String> uploadAvatar(@ModelAttribute MultipartFile file) throws IOException {
        boolean changePass = userService.changeAvatar(file);
        if (changePass) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Update Avatar successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }
}
