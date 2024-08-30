package com.cinemas.service.impl.home;

import com.cinemas.Utils.Constants;
import com.cinemas.Utils.ObjectUtils;
import com.cinemas.configuration.ConfigVNPAY;
import com.cinemas.dto.MailBody;
import com.cinemas.dto.request.BookingWaterRequest;
import com.cinemas.dto.request.PaymentRequest;
import com.cinemas.dto.response.BookingSuccessInfo;
import com.cinemas.dto.response.waterCornBookingResponse;
import com.cinemas.entities.Booking;
import com.cinemas.entities.BookingWaterCorn;
import com.cinemas.entities.ForgotPassword;
import com.cinemas.entities.User;
import com.cinemas.enums.PaymentType;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.*;
import com.cinemas.service.home.PaymentService;
import com.cinemas.service.impl.EmailServiceimpl;
import jakarta.mail.MessagingException;
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
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.cinemas.exception.ErrorCode.EMAIL_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;
import static com.cinemas.service.impl.AuthenticationServiceImpl.optGenerator;

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

    @Autowired
    private EmailServiceimpl emailServiceimpl;

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
            vnp_ReturnUrl += "&quantityWater=" + String.join(",", waterCorns.stream()
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
    public String createpaymentVnpay2(PaymentRequest paymentRequest) throws UnsupportedEncodingException {
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
        vnp_Params.put("vnp_OrderInfo", vnp_TxnRef);

        vnp_Params.put("vnp_OrderType", orderType);

//        Địa chỉ email của khách hàng
//        vnp_Params.put("vnp_Bill_Email", vnp_TxnRef);

        String vnp_ReturnUrl = ConfigVNPAY.vnp_ReturnUrl2;

        vnp_ReturnUrl += "?showtimeId=" + String.valueOf(paymentRequest.getShowtimeId());
        if (paymentRequest.getQuantitySeat() != null & !paymentRequest.getQuantitySeat().isEmpty()) {
            vnp_ReturnUrl += "&quantitySeat=" + String.join(",", paymentRequest.getQuantitySeat());
        }
        if (paymentRequest.getQuantityDoubleSeat() != null & !paymentRequest.getQuantityDoubleSeat().isEmpty()) {
            vnp_ReturnUrl += "&quantityDoubleSeat=" + String.join(",", paymentRequest.getQuantityDoubleSeat());
        }
        if (paymentRequest.getVoucherId() != null) {
            vnp_ReturnUrl += "&voucherId=" + String.valueOf(paymentRequest.getVoucherId());
        }

        if (paymentRequest.getQuantityWater() != null && !paymentRequest.getQuantityWater().isEmpty()) {
            List<BookingWaterCorn> waterCorns = new ArrayList<>();

            paymentRequest.getQuantityWater().forEach(item -> {
                BookingWaterCorn waterCorn = new BookingWaterCorn();
                waterCorn.setQuantity(item.getQuantity());
                waterCorn.setWaterCorn(waterCornRepository.findById(item.getId()).get());
                waterCorn.setBooking(null);
                waterCorns.add(waterCorn);
            });
            bookingWaterRepository.saveAll(waterCorns);
            vnp_ReturnUrl += "&quantityWater=" + String.join(",", waterCorns.stream()
                    .map(item -> item.getWaterCorn().getId().toString())
                    .collect(Collectors.toList()));
        }
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));

        vnp_ReturnUrl += "&userId=" + String.valueOf(user.getId());


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
    public BookingSuccessInfo bookingPaypal(PaymentRequest paymentRequest, PaymentType type) throws MessagingException {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(NOT_FOUND));
        Booking booking = new Booking();
        ObjectUtils.copyFields(paymentRequest, booking);
        booking.setPaymentType(type);
        booking.setCreateAt(LocalDate.now());

        booking.setQuantityDoubleSeat(paymentRequest.getQuantityDoubleSeat() != null && !paymentRequest.getQuantityDoubleSeat().isEmpty()
                ? String.join(", ", paymentRequest.getQuantityDoubleSeat())
                : "");

        booking.setQuantitySeat(paymentRequest.getQuantitySeat() != null && !paymentRequest.getQuantitySeat().isEmpty()
                ? String.join(", ", paymentRequest.getQuantitySeat())
                : "");

        booking.setShowtime(showTimeResponsitory.findById(paymentRequest.getShowtimeId()).get());
        booking.setVoucher(paymentRequest.getVoucherId() != null ? voucherRepository.findById(paymentRequest.getVoucherId()).get() : null);
        booking.setUser(user);
        bookingRepository.save(booking);

        List<BookingWaterCorn> waterCorns = new ArrayList<>();
        List<waterCornBookingResponse> cornBookingResponseList = new ArrayList<>();
        if (paymentRequest.getQuantityWater() != null) {
            paymentRequest.getQuantityWater().forEach(item -> {
                BookingWaterCorn waterCorn = new BookingWaterCorn();
                waterCorn.setQuantity(item.getQuantity());
                waterCorn.setWaterCorn(waterCornRepository.findById(item.getId()).get());
                waterCorn.setBooking(booking);
                bookingWaterRepository.save(waterCorn);
                waterCorns.add(waterCorn);

                waterCornBookingResponse cornBookingResponse = new waterCornBookingResponse();
                cornBookingResponse.setId(waterCorn.getId());
                cornBookingResponse.setName(waterCorn.getWaterCorn().getName());
                cornBookingResponse.setQuantity(item.getQuantity());
                cornBookingResponseList.add(cornBookingResponse);
            });
        }
        booking.setBookingWaterCorn(waterCorns);
        bookingRepository.save(booking);

        BookingSuccessInfo bookingSuccessInfo = new BookingSuccessInfo();
        bookingSuccessInfo.setId(booking.getId());
        bookingSuccessInfo.setOrderId(booking.getOrderId());
        bookingSuccessInfo.setPaymentId(booking.getPaymentId());
        bookingSuccessInfo.setCinemaName(booking.getShowtime().getCinema().getName());
        bookingSuccessInfo.setMovieName(booking.getShowtime().getMovie().getName());
        bookingSuccessInfo.setRoomName(booking.getShowtime().getRoom().getName());
        bookingSuccessInfo.setTime(LocalTime.parse(booking.getShowtime().getTime().toString(), DateTimeFormatter.ofPattern("HH:mm")));
        bookingSuccessInfo.setDate(LocalDate.parse(booking.getShowtime().getDate().toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        bookingSuccessInfo.setQuantitySeat(booking.getQuantitySeat());
        bookingSuccessInfo.setQuantityDoubleSeat(booking.getQuantityDoubleSeat());
        bookingSuccessInfo.setMovieFormat(booking.getShowtime().getMovieFormat());
        bookingSuccessInfo.setTotalPrice(paymentRequest.getTotalPrice());
        bookingSuccessInfo.setBookingWaterCorn(cornBookingResponseList);

        sendEmail(bookingSuccessInfo, user);

        return bookingSuccessInfo;
    }

    @Override
    public boolean bookingVnpay(PaymentRequest paymentRequest, PaymentType type, String userId) throws MessagingException {
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
        List<waterCornBookingResponse> cornBookingResponseList = new ArrayList<>();
        if (paymentRequest.getQuantityWater() != null) {
            paymentRequest.getQuantityWater().forEach(item -> {
                BookingWaterCorn waterCorn = bookingWaterRepository.getById(item.getId());
                waterCorn.setBooking(booking);
                bookingWaterRepository.save(waterCorn);
                waterCorns.add(waterCorn);
                cornBookingResponseList.add(new waterCornBookingResponse(item.getId(), waterCorn.getWaterCorn().getName(), item.getQuantity()));
            });
        }
        booking.setBookingWaterCorn(waterCorns);
        bookingRepository.save(booking);

        BookingSuccessInfo bookingSuccessInfo = new BookingSuccessInfo();
        bookingSuccessInfo.setId(booking.getId());
        bookingSuccessInfo.setOrderId(booking.getOrderId());
        bookingSuccessInfo.setPaymentId(booking.getPaymentId());
        bookingSuccessInfo.setCinemaName(booking.getShowtime().getCinema().getName());
        bookingSuccessInfo.setMovieName(booking.getShowtime().getMovie().getName());
        bookingSuccessInfo.setRoomName(booking.getShowtime().getRoom().getName());
        bookingSuccessInfo.setTime(LocalTime.parse(booking.getShowtime().getTime().toString(), DateTimeFormatter.ofPattern("HH:mm")));
        bookingSuccessInfo.setDate(LocalDate.parse(booking.getShowtime().getDate().toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        bookingSuccessInfo.setQuantitySeat(booking.getQuantitySeat());
        bookingSuccessInfo.setQuantityDoubleSeat(booking.getQuantityDoubleSeat());
        bookingSuccessInfo.setMovieFormat(booking.getShowtime().getMovieFormat());
        bookingSuccessInfo.setTotalPrice(booking.getTotalPrice());
        bookingSuccessInfo.setBookingWaterCorn(cornBookingResponseList);

        sendEmail(bookingSuccessInfo, user);

        return true;
    }

    @Override
    public BookingSuccessInfo bookingVnpay2(PaymentRequest paymentRequest, PaymentType type, String userId) throws MessagingException {
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
        List<waterCornBookingResponse> cornBookingResponseList = new ArrayList<>();

        if (paymentRequest.getQuantityWater() != null) {
            paymentRequest.getQuantityWater().forEach(item -> {
                BookingWaterCorn waterCorn = bookingWaterRepository.getById(item.getId());
                waterCorn.setBooking(booking);
                bookingWaterRepository.save(waterCorn);
                waterCorns.add(waterCorn);
                cornBookingResponseList.add(new waterCornBookingResponse(item.getId(), waterCorn.getWaterCorn().getName(), item.getQuantity()));
            });
        }
        booking.setBookingWaterCorn(waterCorns);
        bookingRepository.save(booking);

        BookingSuccessInfo bookingSuccessInfo = new BookingSuccessInfo();
        bookingSuccessInfo.setId(booking.getId());
        bookingSuccessInfo.setOrderId(booking.getOrderId());
        bookingSuccessInfo.setPaymentId(booking.getPaymentId());
        bookingSuccessInfo.setCinemaName(booking.getShowtime().getCinema().getName());
        bookingSuccessInfo.setMovieName(booking.getShowtime().getMovie().getName());
        bookingSuccessInfo.setRoomName(booking.getShowtime().getRoom().getName());
        bookingSuccessInfo.setTime(LocalTime.parse(booking.getShowtime().getTime().toString(), DateTimeFormatter.ofPattern("HH:mm")));
        bookingSuccessInfo.setDate(LocalDate.parse(booking.getShowtime().getDate().toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        bookingSuccessInfo.setQuantitySeat(booking.getQuantitySeat());
        bookingSuccessInfo.setQuantityDoubleSeat(booking.getQuantityDoubleSeat());
        bookingSuccessInfo.setMovieFormat(booking.getShowtime().getMovieFormat());
        bookingSuccessInfo.setTotalPrice(booking.getTotalPrice());
        bookingSuccessInfo.setBookingWaterCorn(cornBookingResponseList);

        sendEmail(bookingSuccessInfo, user);

        return bookingSuccessInfo;

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

    public void sendEmail(BookingSuccessInfo bookingSuccessInfo, User user) throws MessagingException {
        String otp = optGenerator();
        Map<String, Object> placeholders = new HashMap<>();
        placeholders.put("name", user.getName());
        placeholders.put("orderId", bookingSuccessInfo.getOrderId());
        placeholders.put("paymentId", bookingSuccessInfo.getPaymentId());
        placeholders.put("cinemaName", bookingSuccessInfo.getCinemaName());
        placeholders.put("movieName", bookingSuccessInfo.getMovieName());
        placeholders.put("roomName", bookingSuccessInfo.getRoomName());
        placeholders.put("time", bookingSuccessInfo.getTime());
        placeholders.put("date", bookingSuccessInfo.getDate());
        placeholders.put("quantitySeat", bookingSuccessInfo.getQuantitySeat());
        placeholders.put("quantityDoubleSeat", bookingSuccessInfo.getQuantityDoubleSeat());
        placeholders.put("movieFormat", bookingSuccessInfo.getMovieFormat());
        placeholders.put("bookingWaterCorn", bookingSuccessInfo.getBookingWaterCorn());

//        placeholders.put("totalPrice", bookingSuccessInfo.getTotalPrice().toString());

        MailBody mailBody = MailBody.builder()
                .to(user.getEmail())
                .subject(Constants.SEND_MAIL_SUBJECT.CLIENT_TICKET_PURCHASE_SUCCESS)
                .props(placeholders)
                .build();

        emailServiceimpl.sendHtmlMail(mailBody, Constants.TEMPLATE_FILE_NAME.CLIENT_TICKET_PURCHASE_SUCCESS);
    }
}
