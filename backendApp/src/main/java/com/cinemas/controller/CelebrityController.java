package com.cinemas.controller;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.exception.AppException;
import com.cinemas.service.CelebrityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.cinemas.exception.ErrorCode.*;

@RestController
@RequestMapping("/api/celebrity")
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

    @PostMapping("/create")
    public APIResponse<String> createCelebrity(@ModelAttribute CelebrityRequest celebrityRequest) {
        boolean checkCreate = celebrityService.addCelebrity(celebrityRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Celebrity created successfully");
            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }

    @DeleteMapping("/delete/{id}")
    public APIResponse<Integer> deleteCelebrity(@PathVariable int id) throws IOException {

        boolean checkDelete = celebrityService.deleteCelebrity(id);
        if (checkDelete) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted celeb");
            apiResponse.setResult(id);
            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{id}")
    public Celebrity getCelebrityById(@PathVariable int id) {
        return celebrityService.getCelebrity(id);
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCelebrity(@PathVariable int id, @ModelAttribute CelebrityRequest celebrity, MultipartFile file) {
        try {
            celebrityService.updateCelebrity(id, celebrity, file);
            return ResponseEntity.ok("Successfully updated celebrity");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
