package com.cinemas.service;

import com.cinemas.dto.request.RefreshTokenRequest;
import com.cinemas.dto.request.SignUpRequest;
import com.cinemas.dto.request.SigninRequest;
import com.cinemas.dto.response.JwtAuthenticationResponse;
import com.cinemas.entity.User;

public interface AuthenticationService {
    String signup(SignUpRequest signUpRequest);

    JwtAuthenticationResponse signin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
