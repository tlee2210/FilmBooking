package com.cinemas.service;

import com.cinemas.dto.request.SearchMovie;
import com.cinemas.dto.request.SearchUser;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.Movie;
import com.cinemas.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();

    boolean addUser(UserRequest userRequest);

    UserResponse getEditUserById(int id);

    boolean updateUser(UserRequest userRequest);

    Page<UserResponse> getAllUser(SearchUser searchUser);
}
