package com.cinemas.controller;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.entity.Celebrity;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.service.CelebrityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
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
    public ResponseEntity<?> createCelebrity(@ModelAttribute CelebrityRequest celebrity) {
        try{
            MultipartFile file =celebrity.getFile();
            if(file != null){
                if(file.getSize() > 10 * 1024 * 1024){
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("File is too large, maximum is 10MB");
                }

                String contentType = file.getContentType();
                System.out.println("Uploaded File Content Type: " + contentType);
                if(contentType == null || !contentType.startsWith("image/")){
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("File must be an image");
                }
                String fileName = storeFile(file, celebrity.getRole());
//                Celebrity addCeleb = new Celebrity();
//                addCeleb.setName(celebrity.getName());
//                addCeleb.setBiography(celebrity.getBiography());
//                addCeleb.setDescription(celebrity.getDescription());
//                addCeleb.setNationality(celebrity.getNationality());
//                addCeleb.setRole(celebrity.getRole());
//                addCeleb.setDateOfBirth(celebrity.getDateOfBirth());
                celebrity.setImage(fileName);
                celebrityService.addCelebrity(celebrity);
            }
            return ResponseEntity.ok("Successfully added celeb");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private String storeFile(MultipartFile file, RoleCeleb role) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
        Path uploadDir;
        if(role == RoleCeleb.ACTOR){
            uploadDir = Paths.get("C:/Users/Admin/source/repos/FilmBooking/backendApp/src/main/java/com/cinemas/image/actor");
        }
        else{
            uploadDir = Paths.get("C:/Users/Admin/source/repos/FilmBooking/backendApp/src/main/java/com/cinemas/image/director");
        }

        if(!Files.exists(uploadDir)){
            Files.createDirectories(uploadDir);
        }
        Path destination = Paths.get(uploadDir.toString(), uniqueFileName);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCelebrity(@PathVariable int id) {
        try{
            Celebrity celeb = celebrityService.getCelebrity(id);
            deleteExistingImage(celeb.getImage());
            celebrityService.deleteCelebrity(id);
            return ResponseEntity.ok("Successfully deleted celeb");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private void deleteExistingImage(String imagePath) {
        if (imagePath != null && !imagePath.isEmpty()) {
            try {
                Path root = Paths.get("C:/Users/Admin/source/repos/FilmBooking/backendApp/src/main/java/com/cinemas/image/actor");
                Path file = root.resolve(imagePath);
                Files.deleteIfExists(file);
                Path root2 = Paths.get("C:/Users/Admin/source/repos/FilmBooking/backendApp/src/main/java/com/cinemas/image/director");
                Path file2 = root2.resolve(imagePath);
                Files.deleteIfExists(file2);
            } catch (IOException e) {
                System.err.println("Failed to delete image: " + imagePath);
                e.printStackTrace();
            }
        }
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCelebrity(@PathVariable int id, @ModelAttribute CelebrityRequest celebrity) {
        try {
            MultipartFile fileImg = celebrity.getFile();
            Celebrity celeb = celebrityService.getCelebrity(id);

            if (fileImg != null) {
                deleteExistingImage(celeb.getImage());
                String fileName = storeFile(fileImg, celebrity.getRole());
                celeb.setImage(fileName);
            }

            celebrityService.updateCelebrity(id, celebrity);
            return ResponseEntity.ok("Successfully updated celebrity");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
