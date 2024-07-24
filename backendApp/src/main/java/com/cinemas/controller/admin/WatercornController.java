package com.cinemas.controller.admin;


import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.WaterCornRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.entities.WaterCorn;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.WaterCornService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/watercorn")
@Tag(name = "Dashboard Watercorn Controller")
public class WatercornController {
    @Autowired
    WaterCornService waterCornService;

    /**
     *
     * @param search
     * @param pageNo
     * @param pageSize
     * @param sort
     * @return
     */
    @GetMapping("/v1")
    public APIResponse<Page<WaterCorn>> getAllWaterCorn( @RequestParam(required = false) String search,
                                                         @RequestParam(required = false, defaultValue = "1") Integer pageNo,
                                                         @RequestParam(required = false, defaultValue = "15") Integer pageSize,
                                                         @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort) {
        SearchRequest searchRequest = new SearchRequest(search, pageNo - 1, pageSize, sort);

        Page<WaterCorn> watercornList = waterCornService.getAllWaterCorn(searchRequest);
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
    @PostMapping("/v1/create")
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
    @DeleteMapping("/v1/delete/{slug}")
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
    @GetMapping("/v1/{slug}/edit")
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
    @PutMapping(value = "/v1/update")
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
