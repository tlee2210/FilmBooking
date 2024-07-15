package com.cinemas.service.home;

import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.enums.PaymentType;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PaymentService {
    String createpaymentVnpay(PaymentRequest paymentRequest) throws UnsupportedEncodingException;

    boolean bookingPaypal(PaymentRequest paymentRequest, PaymentType type);
    boolean bookingVnpay(PaymentRequest paymentRequest, PaymentType type, String userId);

    List<BookingWaterRequest> findQuantityWater(List<Integer> quantityWater);
}
