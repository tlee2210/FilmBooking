package com.cinemas.controller.admin;

import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.request.SearchUser;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieGenre;
import com.cinemas.entities.User;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleType;
import com.cinemas.exception.AppException;
import com.cinemas.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RequestMapping("/api/admin/v1/user")
@RestController
@Tag(name = "Dashboard User Controller")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public APIResponse<Page<UserResponse>> getUser(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) RoleType role,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort
    ) {
        SearchUser searchUser = new SearchUser(name, role, pageNo - 1, pageSize, sort);
        Page<UserResponse> userList = userService.getAllUser(searchUser);
        APIResponse<Page<UserResponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(userList);

        return apiResponse;
    }

    @PostMapping("/create")
    public APIResponse<String> createUser(@ModelAttribute UserRequest user) throws IOException {
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
    public APIResponse<String> updateUser(@RequestBody UserRequest userRequest) throws IOException {
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
