package com.cinemas.controller;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.service.CelebrityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/celebrity")
@Tag(name = "Celebrity Controller")
public class CelebrityController {
    @Autowired
    CelebrityService celebrityService;

    @PostMapping
    public APIResponse<Page<Celebrity>> getAllCelebrity(@RequestBody(required = false) PaginationHelper PaginationHelper) {
        System.out.println("ok");
        Page<Celebrity> celebrityList = celebrityService.getAllCelebrity(PaginationHelper);
        APIResponse<Page<Celebrity>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(celebrityList);

        return apiResponse;
    }

    @GetMapping("/{id}")
    public Celebrity getCelebrityById(@PathVariable int id) {
        return celebrityService.getCelebrity(id);
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCelebrity(@ModelAttribute CelebrityRequest celebrity, MultipartFile file) {
        try{
            celebrityService.addCelebrity(celebrity, file);
            return ResponseEntity.ok("Successfully added celeb");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCelebrity(@PathVariable int id) {
        try{
            celebrityService.deleteCelebrity(id);
            return ResponseEntity.ok("Successfully deleted celeb");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
