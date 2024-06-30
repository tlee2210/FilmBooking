package com.cinemas.controller.home;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.HomeCinemaResponse;
import com.cinemas.dto.response.SelectOptionCeleb;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Cinema;
import com.cinemas.service.home.HomeCinemaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home/v1/cinema")
@Tag(name = "Home Cinema Controller")
public class HomeCinemaController {
    @Autowired
    private HomeCinemaService homeCinemaService;

    @GetMapping("/{slug}")
    public APIResponse<HomeCinemaResponse> getCinema(
            @PathVariable String slug,
            @RequestParam(required = false) String city
    ) {
        HomeCinemaResponse cinema = homeCinemaService.getCinemaBySlug(slug, city);
        APIResponse<HomeCinemaResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(cinema);
        return apiResponse;
    }
}
