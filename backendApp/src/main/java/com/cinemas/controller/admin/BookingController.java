package com.cinemas.controller.admin;

import com.cinemas.dto.request.BookingSearchRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.BookingTableResponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.service.admin.BookingService;
import com.cinemas.service.admin.CelebrityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin/booking")
@Tag(name = "Dashboard Booking Controller")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/v1")
    public APIResponse<Page<BookingTableResponse>> getAllBooking(
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) LocalDate startDay,
            @RequestParam(required = false) LocalDate endDay,
            @RequestParam(required = false) String movieName,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort) {

        BookingSearchRequest searchRequest = new BookingSearchRequest(userName, startDay, endDay, movieName, pageNo - 1, pageSize, sort);
        Page<BookingTableResponse> bookingList = bookingService.getAllMovie(searchRequest);
        APIResponse<Page<BookingTableResponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(bookingList);

        return apiResponse;
    }
}
