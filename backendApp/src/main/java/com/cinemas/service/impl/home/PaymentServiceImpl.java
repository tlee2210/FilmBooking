package com.cinemas.service.impl.home;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.configuration.ConfigVNPAY;
import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.entities.Booking;
import com.cinemas.entities.BookingWaterCorn;
import com.cinemas.entities.User;
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
import java.util.stream.Collectors;

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
    public String createpaymentVnpay(PaymentRequest paymentRequest) throws UnsupportedEncodingException {
        String orderType = "other";
        long amount = (long) (paymentRequest.getTotalPrice() * 100);

        String vnp_TxnRef = ConfigVNPAY.getRandomNumber(8);

        String vnp_TmnCode = ConfigVNPAY.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_BankCode", "NCB");

        vnp_Params.put("vnp_Version", ConfigVNPAY.vnp_Version);
        vnp_Params.put("vnp_Command", ConfigVNPAY.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);

        vnp_Params.put("vnp_OrderType", orderType);

//        Địa chỉ email của khách hàng
//        vnp_Params.put("vnp_Bill_Email", vnp_TxnRef);

        String vnp_ReturnUrl = ConfigVNPAY.vnp_ReturnUrl;

        vnp_ReturnUrl += "?showtimeId=" + String.valueOf(paymentRequest.getShowtimeId());
        if (paymentRequest.getQuantitySeat() != null) {
            vnp_ReturnUrl += "&quantitySeat=" + String.join(",", paymentRequest.getQuantitySeat());
        }
        if (paymentRequest.getQuantityDoubleSeat() != null) {
            vnp_ReturnUrl += "&quantityDoubleSeat=" + String.join(",", paymentRequest.getQuantityDoubleSeat());
        }
        if (paymentRequest.getVoucherId() != null) {
            vnp_ReturnUrl += "&voucherId=" + String.valueOf(paymentRequest.getVoucherId());
        }

        if (paymentRequest.getQuantityWater() != null) {
            List<BookingWaterCorn> waterCorns = new ArrayList<>();

            paymentRequest.getQuantityWater().forEach(item -> {
                BookingWaterCorn waterCorn = new BookingWaterCorn();
                waterCorn.setQuantity(item.getQuantity());
                waterCorn.setWaterCorn(waterCornRepository.findById(item.getId()).get());
                waterCorn.setBooking(null);
                waterCorns.add(waterCorn);
            });
            bookingWaterRepository.saveAll(waterCorns);
            vnp_ReturnUrl += "?quantityWater=" + String.join(",", waterCorns.stream()
                    .map(item -> item.getWaterCorn().getId().toString())
                    .collect(Collectors.toList()));
        }
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        vnp_ReturnUrl += "&userId=" + String.valueOf(user.getId());


//        vnp_ReturnUrl += "?quantityWater=" + String.join(",", quantityWater);

        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
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

        return paymentUrl;
    }

    @Override
    public boolean bookingPaypal(PaymentRequest paymentRequest, PaymentType type) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));
        Booking booking = new Booking();
        ObjectUtils.copyFields(paymentRequest, booking);
        booking.setPaymentType(type);
        booking.setCreateAt(LocalDate.now());
        booking.setQuantityDoubleSeat(paymentRequest.getQuantityDoubleSeat() != null ? String.join(", ", paymentRequest.getQuantityDoubleSeat()) : null);
        booking.setQuantitySeat(paymentRequest.getQuantitySeat() != null ? String.join(", ", paymentRequest.getQuantitySeat()) : null);
        booking.setShowtime(showTimeResponsitory.findById(paymentRequest.getShowtimeId()).get());
        booking.setVoucher(paymentRequest.getVoucherId() != null ? voucherRepository.findById(paymentRequest.getVoucherId()).get() : null);
        booking.setUser(user);
        bookingRepository.save(booking);

        List<BookingWaterCorn> waterCorns = new ArrayList<>();
        if (paymentRequest.getQuantityWater() != null) {
            paymentRequest.getQuantityWater().forEach(item -> {
                BookingWaterCorn waterCorn = new BookingWaterCorn();
                waterCorn.setQuantity(item.getQuantity());
                waterCorn.setWaterCorn(waterCornRepository.findById(item.getId()).get());
                waterCorn.setBooking(booking);
                bookingWaterRepository.save(waterCorn);
                waterCorns.add(waterCorn);
            });
        }
        booking.setBookingWaterCorn(waterCorns);
        bookingRepository.save(booking);
        return true;
    }

    @Override
    public boolean bookingVnpay(PaymentRequest paymentRequest, PaymentType type, String userId) {
        User user = userRepository.getById(Integer.valueOf(userId));

        Booking booking = new Booking();
        ObjectUtils.copyFields(paymentRequest, booking);
        booking.setPaymentType(type);
        booking.setCreateAt(LocalDate.now());
        booking.setQuantityDoubleSeat(paymentRequest.getQuantityDoubleSeat() != null ? String.join(", ", paymentRequest.getQuantityDoubleSeat()) : null);
        booking.setQuantitySeat(paymentRequest.getQuantitySeat() != null ? String.join(", ", paymentRequest.getQuantitySeat()) : null);
        booking.setShowtime(showTimeResponsitory.findById(paymentRequest.getShowtimeId()).get());
        booking.setVoucher(paymentRequest.getVoucherId() != null ? voucherRepository.findById(paymentRequest.getVoucherId()).get() : null);
        booking.setUser(user);
        bookingRepository.save(booking);

        List<BookingWaterCorn> waterCorns = new ArrayList<>();
        if (paymentRequest.getQuantityWater() != null) {
            paymentRequest.getQuantityWater().forEach(item -> {
                BookingWaterCorn waterCorn = bookingWaterRepository.getById(item.getId());
                waterCorn.setBooking(booking);
                bookingWaterRepository.save(waterCorn);
                waterCorns.add(waterCorn);
            });
        }
        booking.setBookingWaterCorn(waterCorns);
        bookingRepository.save(booking);
        return true;
    }

    @Override
    public List<BookingWaterRequest> findQuantityWater(List<Integer> quantityWater) {
        List<BookingWaterRequest> bookingWaterRequests = new ArrayList<>();
        quantityWater.forEach(item -> {
            BookingWaterRequest bookingWaterRequest = new BookingWaterRequest();
            bookingWaterRequest = bookingWaterRepository.findByIdConvertToBookingWaterRequestById(item);
            bookingWaterRequests.add(bookingWaterRequest);
        });

        return bookingWaterRequests;
    }
}
