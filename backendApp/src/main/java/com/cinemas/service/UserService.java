package com.cinemas.service;

import com.cinemas.dto.request.SearchUser;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.IOException;

public interface UserService {
    UserDetailsService userDetailsService();

    boolean addUser(UserRequest userRequest) throws IOException;

    UserResponse getEditUserById(int id);

    boolean updateUser(UserRequest userRequest) throws IOException;

    Page<UserResponse> getAllUser(SearchUser searchUser);
}
