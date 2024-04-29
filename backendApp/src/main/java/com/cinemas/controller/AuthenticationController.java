package com.cinemas.controller;

import com.cinemas.dto.request.RefreshTokenRequest;
import com.cinemas.dto.request.SignUpRequest;
import com.cinemas.dto.request.SigninRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.JwtAuthenticationResponse;
import com.cinemas.entity.User;
import com.cinemas.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    /**
     * signUpRequest new user
     *
     * @param signUpRequest
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    /**
     * signin
     *
     * @param signinRequest
     * @return
     */
    @PostMapping(value = "/signin")
    public APIResponse<JwtAuthenticationResponse> signin(@RequestBody @Valid SigninRequest signinRequest) {
        JwtAuthenticationResponse response = authenticationService.signin(signinRequest);

        APIResponse<JwtAuthenticationResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
//        apiResponse.setMessage("Signin successful");
        apiResponse.setResult(response);

        return apiResponse;
    }

    /**
     * refresh Token
     *
     * @param refreshTokenRequest
     * @return
     */
    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }
}
