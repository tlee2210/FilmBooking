package com.cinemas.service;

import com.cinemas.dto.request.MovieGenreRequest;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.entities.MovieGenre;
import com.cinemas.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();

    boolean addUser(UserRequest userRequest);

    User getEditUserById(int id);

    boolean updateUser(UserRequest userRequest);
}
