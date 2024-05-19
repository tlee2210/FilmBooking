package com.cinemas.controller.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Cinema;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.CinemaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/cinema")
@Tag(name = "Cinema Controller")
public class CinemaController {

    @Autowired
    CinemaService cinemaService;

    /**
     * get all list Cinema
     *
     * @param PaginationHelper
     * @return
     */
    @PostMapping
    public APIResponse<Page<Cinema>> getAllCinema(@RequestBody(required = false) PaginationHelper PaginationHelper) {

        Page<Cinema> cinemaList = cinemaService.getAllCinema(PaginationHelper);
        APIResponse<Page<Cinema>> apiResponse = new APIResponse<>();
        apiResponse.setResult(cinemaList);
        apiResponse.setCode(200);

        return apiResponse;
    }

    /**
     * get city create new cinema
     *
     * @return
     */
    @GetMapping("/create")
    public APIResponse<List<SelectOptionReponse>> getCreateCinema() {

        List<SelectOptionReponse> selectOptionReponses = cinemaService.getCreateCinema();
        APIResponse<List<SelectOptionReponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(selectOptionReponses);

        return apiResponse;
    }

    /**
     * Create new Cinema
     *
     * @param cinemaRequest
     * @return
     * @throws IOException
     */
    @PostMapping("/create")
    public APIResponse<String> CreateCinema(@ModelAttribute CinemaRequest cinemaRequest) throws IOException {

        boolean check = cinemaService.createCinema(cinemaRequest);

        if (check) {
            APIResponse<String> apiResponse = new APIResponse<>();
            apiResponse.setCode(200);
            apiResponse.setMessage("Cinema created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    /**
     * get cinema by slug
     *
     * @param slug
     * @return
     */
    @GetMapping("{slug}/edit")
    public APIResponse<EditSelectOptionReponse<Cinema>> getCinemaEdit(@PathVariable String slug) {

        EditSelectOptionReponse<Cinema> cinema = cinemaService.getCinemaEdit(slug);

        APIResponse<EditSelectOptionReponse<Cinema>> cinemaAPIResponse = new APIResponse<>();
        cinemaAPIResponse.setCode(200);
        cinemaAPIResponse.setResult(cinema);

        return cinemaAPIResponse;
    }

    /**
     * update Cinema
     *
     * @param cinemaRequest
     * @return
     * @throws IOException
     */
    @PutMapping("/update")
    public APIResponse<String> updateCinema(@ModelAttribute CinemaRequest cinemaRequest) throws IOException {

        boolean checkUpdate = cinemaService.updateCinema(cinemaRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Cinema Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    /**
     * delete cinema by slug
     *
     * @param slug
     * @return
     * @throws IOException
     */
    @DeleteMapping("/delete/{slug}")
    public APIResponse<Integer> deleteCinema(@PathVariable String slug) throws IOException {
        int id = cinemaService.deleteCinema(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted Cinema");
            apiResponse.setResult(id);

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }
}
