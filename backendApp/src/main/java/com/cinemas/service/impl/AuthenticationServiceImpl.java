package com.cinemas.service.impl;

import com.cinemas.Utils.Constants;
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
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

import static com.cinemas.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;

    private final EmailServiceimpl emailServiceimpl;

    private final ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    public String signup(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail()))
            throw new AppException(EMAIL_EXISTED);
        User user = new User();
        ObjectUtils.copyFields(signUpRequest, user);
        user.setRole(RoleType.USER);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setDOB(signUpRequest.getDOB());
//        System.out.println(user);

        if (user == null)
            throw new IllegalArgumentException("User creation failed");

        userRepository.save(user);

        return "Registration successful";
    }

    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {

        var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow(
                () -> new AppException(EMAIL_EXISTED));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),
                        signinRequest.getPassword()));

        var jwt = jwtService.generateToken(user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        UserSignInRepose userRepo = new UserSignInRepose();

        ObjectUtils.copyFields(user, userRepo);
        if (user.getAvatar() != null) {
            userRepo.setAvatar(fileStorageServiceImpl.getUrlFromPublicId(user.getAvatar()));
        }

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setUser(userRepo);

        return jwtAuthenticationResponse;
    }

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
    public String verifyEmail(verifyMailrequest email) throws MessagingException {

        User user = userRepository.findByEmail(email.getEmail())
                .orElseThrow(() -> new AppException(EMAIL_EXISTED));

        ForgotPassword forgotPassword = forgotPasswordRepository.existsByUserId(user);
        if (forgotPassword != null) {
            forgotPasswordRepository.deleteById(forgotPassword.getFpid());
        }

        String otp = optGenerator();
        Map<String, Object> placeholders = new HashMap<>();
        placeholders.put("OTP", otp);
        placeholders.put("id", user.getId());
        placeholders.put("email", user.getEmail());
        placeholders.put("name", user.getName());

        MailBody mailBody = MailBody.builder()
                .to(email.getEmail())
                .subject(Constants.SEND_MAIL_SUBJECT.CLIENT_FORGOT_PASSWORD)
                .props(placeholders)
                .build();
        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
//                .expirationTime(new Date(System.currentTimeMillis() + 70 * 1000))
                .expirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
                .user(user)
                .build();

        emailServiceimpl.sendHtmlMail(mailBody, Constants.TEMPLATE_FILE_NAME.CLIENT_FORGOT_PASSWORD);

        forgotPasswordRepository.save(fp);

        return "Email Sent for verification!";

    }

    @Override
    public String verifyOtp(String otp, String id) {

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUserid(otp, Integer.parseInt(id))
                .orElseThrow(() -> new AppException(PROVIDE_VALID));

        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            throw new AppException(OTP_EXPIRED);
        }

        return "OTP verified";
    }

    @Override
    public String changePasswordHandler(ChangePassword changePassword, int id) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            throw new AppException(CONFIRM_PASSWORD);
        }

        String encodePassword = passwordEncoder.encode(changePassword.password());
        forgotPasswordRepository.deleteById(id);
        userRepository.updatePassword(id, encodePassword);

        return "password has been changed!";
    }

    public static String optGenerator() {

        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$&*";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(220);

        for (int i = 0; i < 120; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }
}
