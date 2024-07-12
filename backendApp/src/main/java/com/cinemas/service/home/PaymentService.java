package com.cinemas.service.home;

import com.cinemas.dto.request.PaymentRequest;

import java.io.UnsupportedEncodingException;

public interface PaymentService {
    String createpaymentVnpay() throws UnsupportedEncodingException;

    boolean bookingPaypal(PaymentRequest paymentRequest);
}
