package com.cinemas.controller;

import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.MovieGenre;
import com.cinemas.entities.User;
import com.cinemas.exception.AppException;
import com.cinemas.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RequestMapping("/api/admin/v1/user")
@RestController
@Tag(name = "User Controller")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public APIResponse<String> createUser(@RequestBody UserRequest user) {
        boolean checkCreate = userService.addUser(user);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("User created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{id}/edit")
    public APIResponse<UserResponse> getUserById(@PathVariable Integer id) {
        APIResponse<UserResponse> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(userService.getEditUserById(id));

        return apiResponse;
    }

    @PutMapping(value = "/update")
    public APIResponse<String> updateUser(@RequestBody UserRequest userRequest) {
        boolean checkUpdate = userService.updateUser(userRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("User Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }
}
