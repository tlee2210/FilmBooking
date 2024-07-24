package com.cinemas.controller.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.CelebrityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@RestController
@RequestMapping("/api/admin/celebrity")
@Tag(name = "Dashboard Celebrity Controller")
public class CelebrityController {
    @Autowired
    CelebrityService celebrityService;

    /**
     * all list Celebrity or search Celebrity
     *
     * @param search
     * @param role
     * @param pageNo
     * @param pageSize
     * @param sort
     * @return
     */
    @GetMapping("/v1")
    public APIResponse<Page<Celebrity>> getAllCelebrity(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) RoleCeleb role,
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "ASC") Sort.Direction sort) {

        SearchRequest searchRequest = new SearchRequest(search, role, pageNo - 1, pageSize, sort);
        Page<Celebrity> celebrityList = celebrityService.getAllCelebrity(searchRequest);
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
    @GetMapping("/v1/create")
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
    @PostMapping("/v1/create")
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
    @DeleteMapping("/v1/delete/{slug}")
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
    @GetMapping("/v1/{slug}/edit")
    public APIResponse<SelectOptionAndModelReponse<Celebrity>> getCelebrityById(@PathVariable String slug) {
        APIResponse<SelectOptionAndModelReponse<Celebrity>> apiResponse = new APIResponse();

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
    @PutMapping(value = "/v1/update")
    public APIResponse<String> updateCelebrity(@ModelAttribute CelebrityRequest celebrity) throws IOException {
//        System.out.println(celebrity);
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
