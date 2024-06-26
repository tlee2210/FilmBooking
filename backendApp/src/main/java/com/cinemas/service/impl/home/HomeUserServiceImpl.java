package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.ChangePasswordRequest;
import com.cinemas.dto.request.ProfileRequest;
import com.cinemas.dto.response.UserResponse;
import com.cinemas.entities.ChangePassword;
import com.cinemas.entities.User;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.UserRepository;
import com.cinemas.service.home.HomeUserService;
import com.cinemas.service.impl.JWTServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

import static com.cinemas.exception.ErrorCode.*;

@Component
public class HomeUserServiceImpl implements HomeUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponse findUserByUserDetails(UserDetails userDetails) {
        UserResponse userResponse = new UserResponse();
        ObjectUtils.copyFields(userDetails, userResponse);
        return userResponse;
    }

    @Override
    public boolean updateUser(ProfileRequest profileRequest, int id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (userRepository.findByEmailWithId(profileRequest.getEmail(), id) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(profileRequest, user);
        userRepository.save(user);

        return true;
    }

    @Override
    public boolean changePassword(ChangePasswordRequest changePassword, int id) {
        if (!Objects.equals(changePassword.getPassword(), changePassword.getRepeatPassword())) {
            throw new AppException(CONFIRM_PASSWORD);
        }

        String encodePassword = passwordEncoder.encode(changePassword.getNewPassword());
        userRepository.updatePassword(id, encodePassword);
        return true;
    }
}
