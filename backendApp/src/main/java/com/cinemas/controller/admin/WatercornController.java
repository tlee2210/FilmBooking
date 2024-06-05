package com.cinemas.controller.admin;


import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.WaterCornRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.WaterCorn;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.WaterCornService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/watercorn")
@Tag(name = "Dashboard Watercorn Controller")
public class WatercornController {
    @Autowired
    WaterCornService waterCornService;

    /**
     * all list Celebrity
     *
     * @param PaginationHelper
     * @return
     */
    @PostMapping
    public APIResponse<Page<WaterCorn>> getAllWaterCorn(@RequestBody(required = false) PaginationHelper PaginationHelper) {
        Page<WaterCorn> watercornList = waterCornService.getAllWaterCorn(PaginationHelper);
        APIResponse<Page<WaterCorn>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(watercornList);

        return apiResponse;
    }

    /**
     * create new Water-Corn
     *
     * @return
     * @throws IOException
     */
    @PostMapping("/create")
    public APIResponse<String> createWatercorn(@ModelAttribute WaterCornRequest waterCornRequest) throws IOException {
        boolean checkCreate = waterCornService.addWaterCorn(waterCornRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Water Corn created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    /**
     * delete Celebrity by id
     *
     * @param slug
     * @return
     * @throws IOException
     */
    @DeleteMapping("/delete/{slug}")
    public APIResponse<Integer> deleteWaterCorn(@PathVariable String slug) throws IOException {

        int id = waterCornService.deleteWaterCorn(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted watercorn");
            apiResponse.setResult(id);

            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }

    /**
     * get Celebrity by id
     *
     * @param slug
     * @return
     */
    @GetMapping("/{slug}/edit")
    public APIResponse<WaterCorn> getEditWaterCorn(@PathVariable String slug) throws IOException {
        WaterCorn waterCorn = waterCornService.getEditWaterCorn(slug);

        APIResponse<WaterCorn> apiResponse = new APIResponse();
        apiResponse.setCode(200);
        apiResponse.setResult(waterCorn);


        return apiResponse;
    }

    /**
     * @param
     * @return
     * @throws IOException
     */
    @PutMapping(value = "/update")
    public APIResponse<String> updateWatercorn(@ModelAttribute WaterCornRequest waterCornRequest) throws IOException {
//        System.out.println(celebrity);
        boolean checkUpdate = waterCornService.updateWaterCorn(waterCornRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("WaterCorn Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }
}
