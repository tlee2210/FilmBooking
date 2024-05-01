package com.cinemas.service.impl;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.MailBody;
import com.cinemas.dto.request.RefreshTokenRequest;
import com.cinemas.dto.request.SignUpRequest;
import com.cinemas.dto.request.SigninRequest;
import com.cinemas.dto.request.verifyMailrequest;
import com.cinemas.dto.response.JwtAuthenticationResponse;
import com.cinemas.dto.response.UserSignInRepose;
import com.cinemas.entities.ChangePassword;
import com.cinemas.entities.ForgotPassword;
import com.cinemas.entities.User;
import com.cinemas.enums.RoleType;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.ForgotPasswordRepository;
import com.cinemas.repositories.UserRepository;
import com.cinemas.service.AuthenticationService;
import com.cinemas.service.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.*;

import static com.cinemas.exception.ErrorCode.EMAIL_EXISTED;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;

    private final EmailService emailService;

    private final ForgotPasswordRepository forgotPasswordRepository;

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

    @Override
    public String verifyEmail(verifyMailrequest email) {

        User user = userRepository.findByEmail(email.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        ForgotPassword forgotPassword = forgotPasswordRepository.existsByUserId(user);
        if (forgotPassword != null) {
            forgotPasswordRepository.deleteById(forgotPassword.getFpid());
        }

        int otp = optGenerator();
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("OTP", String.valueOf(otp));

        String emailText;
        try {
            emailText = emailService.loadHtmlTemplate("templates/email_template_forgotpassword.html", placeholders);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        MailBody mailBody = MailBody.builder()
                .to(email.getEmail())
                .text(emailText)
                .subject("OTP for Forgot Password request")
                .build();
        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 70 * 1000))
                .user(user)
                .build();

        emailService.sendSimpleMessage(mailBody);

        forgotPasswordRepository.save(fp);

        return "Email Sent for verification!";

    }

    @Override
    public String verifyOtp(Integer otp, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("please provide an valid email" + email));

        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
//            ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED)
            return "OTP has expired!";
        }

        return "OTP verified";
    }

    @Override
    public String changePasswordHandler(ChangePassword changePassword, String email) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
//            ResponseEntity<>("please enter the Password again!", HttpStatus.EXPECTATION_FAILED)
            return null;
        }

        String encodePassword = passwordEncoder.encode(changePassword.password());
        userRepository.updatePassword(email, encodePassword);

        return "password has been changed!";
    }

    private Integer optGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }

}
