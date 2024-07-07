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
import com.cinemas.service.impl.FileStorageServiceImpl;
import com.cinemas.service.impl.JWTServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

import static com.cinemas.exception.ErrorCode.*;

@Component
public class HomeUserServiceImpl implements HomeUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponse getUserProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserResponse userResponse = new UserResponse();

        ObjectUtils.copyFields(userDetails, userResponse);
        userResponse.setAvatar(fileStorageServiceImpl.getUrlFromPublicId(userResponse.getAvatar()));

        return userResponse;
    }

    @Override
    public boolean updateUser(ProfileRequest profileRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if (userRepository.findByEmailWithId(profileRequest.getEmail(), user.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(profileRequest, user);
        userRepository.save(user);

        return true;
    }

    @Override
    public boolean changePassword(ChangePasswordRequest changePassword) {
        if (!Objects.equals(changePassword.getNewPassword(), changePassword.getRepeatPassword())) {
            throw new AppException(CONFIRM_PASSWORD);
        }

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));


        if (!passwordEncoder.matches(changePassword.getPassword(), user.getPassword())) {
            throw new AppException(INVALID_CURRENT_PASSWORD);

        }

        String encodePassword = passwordEncoder.encode(changePassword.getNewPassword());
        userRepository.updatePassword(user.getId(), encodePassword);

        return true;
    }

    @Override
    public boolean changeAvatar(MultipartFile file) throws IOException {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        if(user.getAvatar() != null){
            fileStorageServiceImpl.deleteFile(user.getAvatar());
        }

        user.setAvatar(fileStorageServiceImpl.uploadFile(file,"users"));
        userRepository.save(user);

        return true;
    }
}
