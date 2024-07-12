package com.cinemas.controller.home;

import com.cinemas.configuration.ConfigVNPAY;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.dto.request.VoucherRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.exception.AppException;
import com.cinemas.service.home.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

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
        boolean checkSuccess = paymentService.bookingPaypal(paymentRequest);
        if (checkSuccess) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Checkout successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }
}
