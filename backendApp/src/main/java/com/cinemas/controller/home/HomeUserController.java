package com.cinemas.controller.home;

import com.cinemas.dto.request.ChangePasswordRequest;
import com.cinemas.dto.request.ProfileRequest;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.ChangePassword;
import com.cinemas.exception.AppException;
import com.cinemas.service.home.HomeUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RequestMapping("/api/home/v1/user")
@RestController
@Tag(name = "Home User Controller")
public class HomeUserController {
    @Autowired
    private HomeUserService userService;

    @GetMapping(value = "/profile")
    public APIResponse<UserResponse> getUserFromToken(@RequestHeader("Authorization") String jwt) {
        APIResponse<UserResponse> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(userService.findUserByJwt(jwt));

        return apiResponse;
    }

    @PutMapping(value = "/update")
    public APIResponse<String> updateUser(@RequestHeader("Authorization") String jwt, @RequestBody ProfileRequest profileRequest) {
        int id = userService.findUserByJwt(jwt).getId();
        boolean checkUpdate = userService.updateUser(profileRequest, id);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("User Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    @PostMapping(value = "/change-password")
    public APIResponse<String> changePassword(@RequestHeader("Authorization") String jwt, @RequestBody ChangePasswordRequest changePassword) {
        int id = userService.findUserByJwt(jwt).getId();
        boolean changePass = userService.changePassword(changePassword, id);
        if (changePass) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Change password successfully");

            return apiResponse;
        }
        throw new AppException(UPDATE_FAILED);
    }
}
