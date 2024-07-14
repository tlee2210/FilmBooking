package com.cinemas.controller.home;

import com.cinemas.configuration.ConfigVNPAY;
import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.dto.request.VoucherRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.PaymentType;
import com.cinemas.exception.AppException;
import com.cinemas.service.home.PaymentService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/create_payment_vnpay")
    public APIResponse<String> createpaymentVnpay() throws UnsupportedEncodingException {

        APIResponse<String> apiResponse = new APIResponse<>();
        apiResponse.setResult(paymentService.createpaymentVnpay());

        return apiResponse;
    }

    @PostMapping("/booking_paypal")
    public APIResponse<String> bookingPaypal(@RequestBody PaymentRequest paymentRequest) {
        boolean checkSuccess = paymentService.bookingPaypal(paymentRequest, PaymentType.PAYPAL);
        if (checkSuccess) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Checkout successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/booking_vnpay")
    public APIResponse<String> bookingVnpay(
            @RequestParam(required = false) String orderId,
            @RequestParam(required = false) String paymentId,
            @RequestParam(required = false) List<String> quantitySeat,
            @RequestParam(required = false) List<String> quantityDoubleSeat,
            @RequestParam(required = false) Float totalPrice,
            @RequestParam(required = false) Integer showtimeId,
            @RequestParam(required = false) Integer voucherId,
            @RequestParam(required = false) List<String> quantityWater
    ) {
        List<BookingWaterRequest> bookingWaterRequests = (quantityWater == null ? null : convertToBookingWaterRequestList(quantityWater));
        PaymentRequest paymentRequest = new PaymentRequest(
                orderId, paymentId, quantitySeat, quantityDoubleSeat, totalPrice, showtimeId, voucherId, bookingWaterRequests);
        boolean checkSuccess = paymentService.bookingPaypal(paymentRequest, PaymentType.VNPAY);
        if (checkSuccess) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Checkout successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    private List<BookingWaterRequest> convertToBookingWaterRequestList(List<String> quantityWater) {
        if (quantityWater == null) {
            return null;
        }

        return quantityWater.stream()
                .map(this::convertToBookingWaterRequest)
                .collect(Collectors.toList());
    }

    private BookingWaterRequest convertToBookingWaterRequest(String waterRequestStr) {
        String[] parts = waterRequestStr.split("-");
        int bookingId = Integer.parseInt(parts[0]);
        int quantity = Integer.parseInt(parts[1]);
        BookingWaterRequest bookingWaterRequest = new BookingWaterRequest();
        bookingWaterRequest.setId(bookingId);
        bookingWaterRequest.setQuantity(quantity);
        return bookingWaterRequest;
    }
}
