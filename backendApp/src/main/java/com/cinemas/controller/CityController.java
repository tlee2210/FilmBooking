package com.cinemas.controller;

import com.cinemas.dto.request.CityRequest;
import com.cinemas.entities.City;
import com.cinemas.service.CityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/city")
@Tag(name = "City Controller")
public class CityController {
    @Autowired
    private CityService cityService;

    @GetMapping("")
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityService.getCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable int id) {
        City city = cityService.getCity(id);
        return ResponseEntity.ok(city);
    }

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCity(@ModelAttribute CityRequest city) {
        try {
            cityService.addCity(city);
            return ResponseEntity.ok("Created successfully");
        }
        catch (Exception e) {
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable int id) {
        try {
            cityService.deleteCity(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCity(@PathVariable int id, @RequestBody CityRequest city) {
        try {
            cityService.updateCity(id, city);
            return ResponseEntity.ok("Updated successfully");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
