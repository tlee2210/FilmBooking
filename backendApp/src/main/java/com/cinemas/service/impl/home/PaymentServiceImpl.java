package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.configuration.ConfigVNPAY;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.entities.Booking;
import com.cinemas.entities.BookingWaterCorn;
import com.cinemas.entities.User;
import com.cinemas.entities.Voucher;
import com.cinemas.enums.PaymentType;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.*;
import com.cinemas.service.home.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private ShowTimeResponsitory showTimeResponsitory;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private WaterCornRepository waterCornRepository;

    @Autowired
    private BookingWaterRepository bookingWaterRepository;

    @Override
    public String createpaymentVnpay() throws UnsupportedEncodingException {
        String orderType = "other";
        long amount = 1000000 * 100;
//        String bankCode = req.getParameter("bankCode");


        String vnp_TxnRef = ConfigVNPAY.getRandomNumber(8);
//        String vnp_IpAddr = ConfigVNPAY.getIpAddress(req);

        String vnp_TmnCode = ConfigVNPAY.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", ConfigVNPAY.vnp_Version);
        vnp_Params.put("vnp_Command", ConfigVNPAY.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        //        if (bankCode != null && !bankCode.isEmpty()) {
//            vnp_Params.put("vnp_BankCode", bankCode);
//        }
//        request.getRemoteAddr();
        vnp_Params.put("vnp_OrderType", orderType);

//        String locate = req.getParameter("language");
//        if (locate != null && !locate.isEmpty()) {
//            vnp_Params.put("vnp_Locale", locate);
//        } else {
//            vnp_Params.put("vnp_Locale", "vn");
//        }
//        Địa chỉ email của khách hàng
//        vnp_Params.put("vnp_Bill_Email", vnp_TxnRef);

        vnp_Params.put("vnp_ReturnUrl", ConfigVNPAY.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", request.getRemoteAddr());

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = ConfigVNPAY.hmacSHA512(ConfigVNPAY.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = ConfigVNPAY.vnp_PayUrl + "?" + queryUrl;
//        com.google.gson.JsonObject job = new JsonObject();
//        job.addProperty("code", "00");
//        job.addProperty("message", "success");
//        job.addProperty("data", paymentUrl);
//        Gson gson = new Gson();
//        resp.getWriter().write(gson.toJson(job));

        return paymentUrl;
    }

    @Override
    public boolean bookingPaypal(PaymentRequest paymentRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));
        Booking booking = new Booking();
        ObjectUtils.copyFields(paymentRequest, booking);
        booking.setPaymentType(PaymentType.PAYPAL);
        booking.setCreateAt(LocalDate.now());
        booking.setQuantityDoubleSeat(String.join(", ", paymentRequest.getQuantityDoubleSeat()));
        booking.setQuantitySeat(String.join(", ", paymentRequest.getQuantitySeat()));
        booking.setShowtime(showTimeResponsitory.findById(paymentRequest.getShowtimeId()).get());
        booking.setVoucher(paymentRequest.getVoucherId().equals(0) ? null : voucherRepository.findById(paymentRequest.getVoucherId()).get());
        booking.setUser(user);
        bookingRepository.save(booking);

        List<BookingWaterCorn> waterCorns = new ArrayList<>();
        paymentRequest.getQuantityWater().forEach(item -> {
            BookingWaterCorn waterCorn = new BookingWaterCorn();
            waterCorn.setQuantity(item.getQuantity());
            waterCorn.setWaterCorn(waterCornRepository.findById(item.getBookingId()).get());
            waterCorn.setBooking(booking);
            bookingWaterRepository.save(waterCorn);
            waterCorns.add(waterCorn);
        });
        booking.setBookingWaterCorn(waterCorns);
        bookingRepository.save(booking);
        return true;
    }
}
