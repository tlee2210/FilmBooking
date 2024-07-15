package com.cinemas.controller.home;

import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.enums.PaymentType;
import com.cinemas.exception.AppException;
import com.cinemas.service.home.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.util.RedirectUrlBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create_payment_vnpay")
    public APIResponse<String> createpaymentVnpay(@RequestBody PaymentRequest paymentRequest) throws UnsupportedEncodingException {
        APIResponse<String> apiResponse = new APIResponse<>();
        apiResponse.setResult(paymentService.createpaymentVnpay(paymentRequest));

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
//    public APIResponse<String> bookingVnpay(
    public RedirectView bookingVnpay(
            @RequestParam(required = false) String vnp_OrderInfo,
            @RequestParam(required = false) String vnp_TransactionNo,
            @RequestParam(required = false) String quantitySeat,
            @RequestParam(required = false) String quantityDoubleSeat,
            @RequestParam(required = false) Float vnp_Amount,
            @RequestParam(required = false) Integer showtimeId,
            @RequestParam(required = false) Integer voucherId,
            @RequestParam(required = false) String quantityWater,
            @RequestParam(required = false) String userId
    ) {

        List<String> quantitySeats = quantitySeat != null ? Arrays.asList(quantitySeat.split(",")) : null;
        List<String> quantityDoubleSeats = quantityDoubleSeat != null ? Arrays.asList(quantityDoubleSeat.split(",")) : null;
        List<Integer> quantityWaters = quantityWater != null
                ? Arrays.stream(quantityWater.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList())
                : null;

        List<BookingWaterRequest> bookingWaterRequests = (quantityWater == null ? null : paymentService.findQuantityWater(quantityWaters));

        PaymentRequest paymentRequest = new PaymentRequest(
                vnp_OrderInfo, vnp_TransactionNo, quantitySeats, quantityDoubleSeats, vnp_Amount, showtimeId, voucherId, bookingWaterRequests);

        boolean checkSuccess = paymentService.bookingVnpay(paymentRequest, PaymentType.VNPAY, userId);
//        if (checkSuccess) {
//            APIResponse<String> apiResponse = new APIResponse();
//            apiResponse.setCode(200);
//            apiResponse.setMessage("Checkout successfully");
//
//            return ProcessBuilder.Redirect("http://localhost:3000/profile");
//        }

        if (checkSuccess) {
            return new RedirectView("http://localhost:3000/profile");
        }

        throw new AppException(CREATE_FAILED);
//        return null;
    }

}
