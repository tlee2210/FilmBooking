package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.ChangePasswordRequest;
import com.cinemas.dto.request.ProfileRequest;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Booking;
import com.cinemas.entities.ChangePassword;
import com.cinemas.entities.Showtimes;
import com.cinemas.entities.User;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.BookingRepository;
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
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public ProfileResponse getUserProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ProfileResponse profileResponse = new ProfileResponse();

        ObjectUtils.copyFields(userDetails, profileResponse);
        profileResponse.setAvatar(fileStorageServiceImpl.getUrlFromPublicId(profileResponse.getAvatar()));

        List<Booking> bookings = bookingRepository.findByUserId(profileResponse.getId());
        List<PaymentResponse> paymentResponses = new ArrayList<>();
        bookings.forEach(booking -> {
            PaymentResponse paymentResponse = new PaymentResponse();
            Showtimes showtimes = booking.getShowtime();
            List<BookingWaterCornResponse> bookingWaterCornResponses = new ArrayList<>();
            ShowTimeTableResponse showTimeTableResponse =
                    new ShowTimeTableResponse(showtimes.getId(), showtimes.getDate(), showtimes.getTime(),
                            showtimes.getCinema().getName(), showtimes.getMovie().getName(), showtimes.getRoom().getName(),
                            showtimes.getMovie().getImagePortrait(), showtimes.getMovie().getPrice(), showtimes.getMovieFormat());

            ObjectUtils.copyFields(booking, paymentResponse);
            booking.getBookingWaterCorn().forEach(waterCorn -> {
                BookingWaterCornResponse bookingWaterCornResponse = new BookingWaterCornResponse();
                ObjectUtils.copyFields(waterCorn, bookingWaterCornResponse);
                bookingWaterCornResponses.add(bookingWaterCornResponse);
            });
            showTimeTableResponse.setImage(fileStorageServiceImpl.getUrlFromPublicId(showTimeTableResponse.getImage()));
            paymentResponse.setShowtime(showTimeTableResponse);
            paymentResponse.setBookingWaterCorn(bookingWaterCornResponses);

            paymentResponses.add(paymentResponse);
        });
        profileResponse.setPaymentList(paymentResponses);

        return profileResponse;
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

        if (user.getAvatar() != null) {
            fileStorageServiceImpl.deleteFile(user.getAvatar());
        }

        user.setAvatar(fileStorageServiceImpl.uploadFile(file, "users"));
        userRepository.save(user);

        return true;
    }
}
