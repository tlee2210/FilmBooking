package com.cinemas.dto.response;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    //    private String refreshToken;
    private UserSignInRepose user;
}
