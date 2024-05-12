package com.cinemas.controller.admin;

import com.cinemas.dto.request.CityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.CityResponse;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.CityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/city")
@Tag(name = "City Controller")
public class CityController {
    @Autowired
    private CityService cityService;

    @PostMapping("")
    public APIResponse<Page<CityResponse>> getAllCities(@RequestBody(required = false) PaginationHelper PaginationHelper) {
        Page<CityResponse> cityList = cityService.getCitiesAll(PaginationHelper);
        APIResponse<Page<CityResponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(cityList);

        return apiResponse;
    }

    @GetMapping("/{id}/edit")
    public APIResponse<CityResponse> getCityById(@PathVariable int id) {

        APIResponse<CityResponse> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(cityService.getCity(id));

        return apiResponse;
    }

    @PostMapping(value = "/create")
    public APIResponse<String> createCity(@RequestBody CityRequest city) {
        boolean check = cityService.addCity(city);
        if (check) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("City created successfully");
            return apiResponse;
        }
        throw new AppException(UPDATE_FAILED);
    }

    @DeleteMapping("/delete/{id}")
    public APIResponse<String> deleteCity(@PathVariable int id) {
        boolean check = cityService.deleteCity(id);
        if (check) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Deleted successfully");
            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }

    @PutMapping(value = "/update")
    public APIResponse<String> updateCity(@RequestBody CityRequest city) {

        boolean check = cityService.updateCity(city);
        if (check) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("city Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }
}
