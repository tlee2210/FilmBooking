package com.cinemas.service.home;

import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.dto.response.BookingSuccessInfo;
import com.cinemas.enums.PaymentType;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PaymentService {
    String createpaymentVnpay(PaymentRequest paymentRequest) throws UnsupportedEncodingException;

    String createpaymentVnpay2(PaymentRequest paymentRequest) throws UnsupportedEncodingException;

    BookingSuccessInfo bookingPaypal(PaymentRequest paymentRequest, PaymentType type) throws MessagingException;

    boolean bookingVnpay(PaymentRequest paymentRequest, PaymentType type, String userId);

    BookingSuccessInfo bookingVnpay2(PaymentRequest paymentRequest, PaymentType type, String userId) throws MessagingException;

    List<BookingWaterRequest> findQuantityWater(List<Integer> quantityWater);
}
