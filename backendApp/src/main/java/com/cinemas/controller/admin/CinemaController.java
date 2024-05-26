package com.cinemas.controller.admin;

import com.cinemas.dto.request.CinemaRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.cinemaSearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Cinema;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.enums.StatusCinema;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.CinemaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/cinema")
@Tag(name = "Cinema Controller")
public class CinemaController {

    @Autowired
    CinemaService cinemaService;

    /**
     * get all list or search Cinema
     *
     * @param search
     * @param status
     * @param city
     * @param pageNo
     * @param pageSize
     * @param sort
     * @return
     */
    @GetMapping
    public APIResponse<SelectOptionAndModelReponse<Page<Cinema>>> getAllCinema(@RequestParam(required = false) String search,
                                                                               @RequestParam(required = false) StatusCinema status,
                                                                               @RequestParam(required = false) String city,
                                                                               @RequestParam(required = false, defaultValue = "1") Integer pageNo,
                                                                               @RequestParam(required = false, defaultValue = "15") Integer pageSize,
                                                                               @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort) {

        cinemaSearchRequest cinemaSearchRequest = new cinemaSearchRequest(search, status, city, pageNo - 1, pageSize, sort);
        SelectOptionAndModelReponse<Page<Cinema>> cinemaList = cinemaService.getAllCinema(cinemaSearchRequest);
        APIResponse<SelectOptionAndModelReponse<Page<Cinema>>> apiResponse = new APIResponse<>();
        apiResponse.setResult(cinemaList);
        apiResponse.setCode(200);

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
    public APIResponse<Cinema> getCinemaEdit(@PathVariable String slug) {

        Cinema cinema = cinemaService.getCinemaEdit(slug);

        APIResponse<Cinema> cinemaAPIResponse = new APIResponse<>();
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
