package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.BuyTicketResponse;
import com.cinemas.service.home.HomeBuyTicketService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/home/v1/buy-ticket")
@Tag(name = "Home Buy Ticket Controller")
public class HomeBuyTicketController {
    @Autowired
    private HomeBuyTicketService homeBuyTicketService;

    @GetMapping()
    public APIResponse<BuyTicketResponse> getTicketInfo(
            @RequestParam(required = false) String slugmovie,
            @RequestParam(required = false) String slugcinema,
            @RequestParam(required = false) LocalDate time) {
        BuyTicketResponse buyTicket = homeBuyTicketService.getInfoTicket(slugmovie, slugcinema, time);
        APIResponse<BuyTicketResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(buyTicket);
        return apiResponse;
    }
}
