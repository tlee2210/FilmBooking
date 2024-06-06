package com.cinemas.service.home;

import com.cinemas.dto.request.ChangePasswordRequest;
import com.cinemas.dto.request.ProfileRequest;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.ChangePassword;
import org.springframework.security.core.userdetails.UserDetails;

public interface HomeUserService {
    UserResponse findUserByUserDetails(UserDetails userDetails);

    boolean updateUser(ProfileRequest profileRequest, int id);

    boolean changePassword(ChangePasswordRequest changePassword, int id);
}
