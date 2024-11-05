package com.cinemas.controller.admin;

import com.cinemas.dto.request.*;
import com.cinemas.dto.response.*;
import com.cinemas.entities.Showtimes;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.ShowTimeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@RestController
@RequestMapping("/api/admin/show-time")
@Tag(name = "Dashboard Show Time Controller")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShowTimeController {
    @Autowired
    ShowTimeService showTimeService;

    @GetMapping("/v1")
    public APIResponse<SelectOptionAndModelReponse<Page<ShowTimeTableResponse>>> getAllShowTime(
            @RequestParam(required = false) String cinema,
            @RequestParam(required = false) LocalDate startDay,
            @RequestParam(required = false) LocalDate endDay,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort) {
        searchShowTimeRequest showTimeRequest = new searchShowTimeRequest(pageNo - 1, pageSize, sort, cinema, startDay, endDay);
        SelectOptionAndModelReponse<Page<ShowTimeTableResponse>> showtimes = showTimeService.getAllShowTime(showTimeRequest);

        APIResponse<SelectOptionAndModelReponse<Page<ShowTimeTableResponse>>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(showtimes);

        return apiResponse;
    }

    @GetMapping("/v1/create")
    public APIResponse<ShowTimeCreateResponse> getCreate() {
        ShowTimeCreateResponse response = showTimeService.getcreate();
        APIResponse<ShowTimeCreateResponse> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(response);

        return apiResponse;
    }

    @GetMapping("/v1/create/room")
    public APIResponse<List<SelectOptionReponse>> getRoomCreate(Integer idCinema) {
        APIResponse<List<SelectOptionReponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(showTimeService.getRoomCreate(idCinema));

        return apiResponse;
    }

    @PostMapping("/v1/create")
    public APIResponse<String> create(@RequestBody @Valid ShowTimeRequest showTimeRequest) {
        boolean checkCreate = showTimeService.createShowTime(showTimeRequest);

        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse<>();
            apiResponse.setCode(200);
            apiResponse.setMessage("Set Time Successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/v1/{id}/edit")
    public APIResponse<showTimeItemRequet> getEdit(@PathVariable Integer id) {
        APIResponse<showTimeItemRequet> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(showTimeService.getEdit(id));

        return apiResponse;
    }

    @DeleteMapping("/v1/{id}/delete")
    public APIResponse<String> deleteShowTime(@PathVariable Integer id) {
        boolean checkDelete = showTimeService.delete(id);
        if (checkDelete) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Delete successfully");

            return apiResponse;
        }

        throw new AppException(DELETE_FAILED);
    }

    @PutMapping("/v1/update")
    public APIResponse<String> updateShowTime(@RequestBody showTimeItemRequet showTimeItemRequet) {
        boolean checkUpdate = showTimeService.updateShowTime(showTimeItemRequet);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Update successfully");

            return apiResponse;
        }
        throw new AppException(UPDATE_FAILED);
    }
}
