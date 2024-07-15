package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.response.BookingWaterCornResponse;
import com.cinemas.dto.response.PaymentResponse;
import com.cinemas.dto.response.ProfileResponse;
import com.cinemas.dto.response.ShowTimeTableResponse;
import com.cinemas.entities.Booking;
import com.cinemas.entities.Showtimes;
import com.cinemas.entities.User;
import com.cinemas.repositories.BookingRepository;
import com.cinemas.repositories.UserRepository;
import com.cinemas.service.home.ProfileService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public ProfileResponse getProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ProfileResponse profileResponse = new ProfileResponse();

        ObjectUtils.copyFields(userDetails, profileResponse);

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
}
