package com.cinemas.service.impl;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.RefreshTokenRequest;
import com.cinemas.dto.request.SignUpRequest;
import com.cinemas.dto.request.SigninRequest;
import com.cinemas.dto.response.JwtAuthenticationResponse;
import com.cinemas.dto.response.UserSignInRepose;
import com.cinemas.entity.User;
import com.cinemas.enums.RoleType;
import com.cinemas.exception.AppException;
import com.cinemas.repository.UserRepository;
import com.cinemas.service.AuthenticationService;
import com.cinemas.service.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;

import static com.cinemas.exception.ErrorCode.EMAIL_EXISTED;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;

    public String signup(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail()))
            throw new AppException(EMAIL_EXISTED);
        User user = new User();
        ObjectUtils.copyFields(signUpRequest, user);
        user.setRole(RoleType.USER);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setDOB(signUpRequest.getDOB());
        System.out.println(user);

        if (user == null)
            throw new IllegalArgumentException("User creation failed");

        userRepository.save(user);

        return "Registration successful";
    }

    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),
                        signinRequest.getPassword()));

        var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow(
                () -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        UserSignInRepose userRepo = new UserSignInRepose();

        ObjectUtils.copyFields(user, userRepo);

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setUser(userRepo);

        return jwtAuthenticationResponse;
    }

    //    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
//        String useremail = jwtService.extractUserName(refreshTokenRequest.getToken());
//        User user = userRepository.findByEmail(useremail).orElseThrow();
//        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
//            var jwt = jwtService.generateToken(user);
//
//            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
//
//            jwtAuthenticationResponse.setToken(jwt);
//            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
//
//            return jwtAuthenticationResponse;
//        }
//
//        return null;
//    }
    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
            var jwt = jwtService.generateToken(user);
            var newRefreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
//            jwtAuthenticationResponse.setRefreshToken(newRefreshToken); // Set new refresh token

            return jwtAuthenticationResponse;
        }

        throw new IllegalStateException("Invalid token");
    }
}
