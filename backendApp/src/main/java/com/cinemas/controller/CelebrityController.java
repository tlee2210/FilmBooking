package com.cinemas.controller;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.entities.Celebrity;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.service.CelebrityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/celebrity")
@Tag(name = "Celebrity Controller")
public class CelebrityController {
    @Autowired
    CelebrityService celebrityService;

    @GetMapping
    public ResponseEntity<List<Celebrity>> getAllCelebrity() {
        List<Celebrity> celebrityList = celebrityService.getAllCelebrity();
        return new ResponseEntity<>(celebrityList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Celebrity getCelebrityById(@PathVariable int id) {
        return celebrityService.getCelebrity(id);
    }

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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
