package com.cinemas.controller;

import com.cinemas.dto.request.RefreshTokenRequest;
import com.cinemas.dto.request.SignUpRequest;
import com.cinemas.dto.request.SigninRequest;
import com.cinemas.dto.request.verifyMailrequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.JwtAuthenticationResponse;
import com.cinemas.entities.ChangePassword;
import com.cinemas.entities.User;
import com.cinemas.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication Controller")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    /**
     * signUpRequest new user
     *
     * @param signUpRequest
     * @return
     */
    @PostMapping("/signup")
    public APIResponse<User> signup(@RequestBody @Valid SignUpRequest signUpRequest) {
        String response = authenticationService.signup(signUpRequest);

        APIResponse<User> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setMessage(response);

        return apiResponse;
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
        apiResponse.setMessage("Signin successful");
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
    public APIResponse<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        JwtAuthenticationResponse response = authenticationService.refreshToken(refreshTokenRequest);

        APIResponse<JwtAuthenticationResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setMessage("Signin successful");
        apiResponse.setResult(response);

        return apiResponse;
    }

    @PostMapping("/verifyMail")
    public APIResponse<String> verifyEmail(@RequestBody verifyMailrequest email) throws MessagingException {

        String response = authenticationService.verifyEmail(email);

        APIResponse<String> apiResponse = new APIResponse<>();

        apiResponse.setCode(200);
        apiResponse.setMessage(response);

        return apiResponse;
    }

    @GetMapping("/verifyOtp/{otp}/{id}")
    public APIResponse<String> verifyOtp(@PathVariable String otp, @PathVariable String id) {
        String response = authenticationService.verifyOtp(otp, id);

        APIResponse<String> apiResponse = new APIResponse<>();

        apiResponse.setCode(200);
        apiResponse.setMessage(response);

        return apiResponse;
    }

    @PostMapping("/changePassword/{id}")
    public APIResponse<String> changePasswordHandler(@RequestBody ChangePassword changePassword,
                                                     @PathVariable int id) {
        String response = authenticationService.changePasswordHandler(changePassword, id);

        APIResponse<String> apiResponse = new APIResponse<>();

        apiResponse.setCode(200);
        apiResponse.setMessage(response);

        return apiResponse;
    }
}
