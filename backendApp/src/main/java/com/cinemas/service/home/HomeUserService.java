package com.cinemas.service.home;

import com.cinemas.dto.request.ChangePasswordRequest;
import com.cinemas.dto.request.ProfileRequest;
import com.cinemas.dto.request.UserRequest;
import com.cinemas.dto.response.ProfileResponse;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.ChangePassword;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface HomeUserService {
    ProfileResponse getUserProfile();

    boolean updateUser(ProfileRequest profileRequest);

    boolean changePassword(ChangePasswordRequest changePassword);

    boolean changeAvatar(MultipartFile file) throws IOException;
}
