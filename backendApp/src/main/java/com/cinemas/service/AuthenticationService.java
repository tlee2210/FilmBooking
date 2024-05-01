package com.cinemas.service;

import com.cinemas.dto.request.RefreshTokenRequest;
import com.cinemas.dto.request.SignUpRequest;
import com.cinemas.dto.request.SigninRequest;
import com.cinemas.dto.request.verifyMailrequest;
import com.cinemas.dto.response.JwtAuthenticationResponse;
import com.cinemas.entities.ChangePassword;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface AuthenticationService {
    String signup(SignUpRequest signUpRequest);

    JwtAuthenticationResponse signin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

    String verifyEmail(verifyMailrequest email);

    String verifyOtp(Integer otp, String email);

    String changePasswordHandler(ChangePassword changePassword, String email);
}
