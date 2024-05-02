package com.cinemas.service;

import com.cinemas.dto.request.RefreshTokenRequest;
import com.cinemas.dto.request.SignUpRequest;
import com.cinemas.dto.request.SigninRequest;
import com.cinemas.dto.request.verifyMailrequest;
import com.cinemas.dto.response.JwtAuthenticationResponse;
import com.cinemas.entities.ChangePassword;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface AuthenticationService {
    String signup(SignUpRequest signUpRequest);

    JwtAuthenticationResponse signin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

    String verifyEmail(verifyMailrequest email) throws MessagingException;

    String verifyOtp(String otp, String id);

    String changePasswordHandler(ChangePassword changePassword, int id);
}
