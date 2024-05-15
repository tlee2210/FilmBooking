package com.cinemas.controller.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.CelebrityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@RestController
@RequestMapping("/api/admin/v1/celebrity")
@Tag(name = "Celebrity Controller")
public class CelebrityController {
    @Autowired
    CelebrityService celebrityService;

    /**
     * all list Celebrity
     *
     * @param PaginationHelper
     * @return
     */
    @PostMapping
    public APIResponse<Page<Celebrity>> getAllCelebrity(@RequestBody(required = false) PaginationHelper PaginationHelper) {
        Page<Celebrity> celebrityList = celebrityService.getAllCelebrity(PaginationHelper);
        APIResponse<Page<Celebrity>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(celebrityList);

        return apiResponse;
    }

    /**
     * get country list create
     *
     * @return
     */
    @GetMapping("/create")
    public APIResponse<List<SelectOptionReponse>> getCreateCelebrity() {
        List<SelectOptionReponse> countryList = celebrityService.getCreateCelebrity();
        APIResponse<List<SelectOptionReponse>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(countryList);
        return apiResponse;
    }

    /**
     * create new Celebrity
     *
     * @param celebrityRequest
     * @return
     * @throws IOException
     */
    @PostMapping("/create")
    public APIResponse<String> createCelebrity(@ModelAttribute CelebrityRequest celebrityRequest) throws IOException {
        boolean checkCreate = celebrityService.addCelebrity(celebrityRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Celebrity created successfully");
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
    public APIResponse<Integer> deleteCelebrity(@PathVariable String slug) throws IOException {

        int id = celebrityService.deleteCelebrity(slug);
        if (id > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted celeb");
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
    public APIResponse<EditSelectOptionReponse<Celebrity>> getCelebrityById(@PathVariable String slug) {
        APIResponse<EditSelectOptionReponse<Celebrity>> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(celebrityService.getEditCelebrityBySlug(slug));

        return apiResponse;
    }

    /**
     * update Celebrity
     *
     * @param celebrity
     * @return
     * @throws IOException
     */
    @PutMapping(value = "/update")
    public APIResponse<String> updateCelebrity(@ModelAttribute CelebrityRequest celebrity) throws IOException {
        System.out.println(celebrity);
        boolean checkUpdate = celebrityService.updateCelebrity(celebrity);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Celebrity Update successfully");
            return apiResponse;
        }
        throw new AppException(UPDATE_FAILED);
    }
}
