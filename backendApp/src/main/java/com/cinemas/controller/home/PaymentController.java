package com.cinemas.controller.home;

import com.cinemas.configuration.ConfigVNPAY;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.service.home.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

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
}
