package com.cinemas.controller.admin;

import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.dto.response.ShowTimeCreateResponse;
import com.cinemas.service.admin.ShowTimeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/v1/show-time")
@Tag(name = "Dashboard Show Time Controller")
public class ShowTimeController {
    @Autowired
    ShowTimeService showTimeService;

    @GetMapping("/create")
    public APIResponse<ShowTimeCreateResponse> getCreate() {
        ShowTimeCreateResponse response = showTimeService.getcreate();
        APIResponse<ShowTimeCreateResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(response);

        return apiResponse;
    }
    @GetMapping("/create/room")
    public APIResponse<List<SelectOptionReponse>> getRoomCreate(Integer idCinema){
        List<SelectOptionReponse> response = showTimeService.getRoomCreate(idCinema);

        APIResponse<List<SelectOptionReponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(response);

        return apiResponse;
    }

}
