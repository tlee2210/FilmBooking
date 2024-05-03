package com.cinemas.service.impl;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.entities.Celebrity;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.service.CelebrityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import static com.cinemas.enums.RoleCeleb.ACTOR;

@Service
public class CelebrityServiceImpl implements CelebrityService {
    @Autowired
    CelebrityRepository celebrityRepository;

    private String storeFile(MultipartFile file, RoleCeleb role) throws IOException {
//        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
//        Path uploadDir;
//        if(role == ACTOR){
//            uploadDir = Paths.get("C:/Users/Admin/source/repos/FilmBooking/backendApp/src/main/java/com/cinemas/image/actor");
//        }
//        else{
//            uploadDir = Paths.get("C:/Users/Admin/source/repos/FilmBooking/backendApp/src/main/java/com/cinemas/image/director");
//        }
//
//        if(!Files.exists(uploadDir)){
//            Files.createDirectories(uploadDir);
//        }
//        Path destination = Paths.get(uploadDir.toString(), uniqueFileName);
//        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
//        return uniqueFileName;

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
        String roleCeleb = role == ACTOR ? "ACTOR" : "DIRECTOR";
        String uploadDir = "image/" + roleCeleb;

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectory(uploadPath);
        }
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
    }

    @Override
    public List<Celebrity> getAllCelebrity() {
        return celebrityRepository.findAll();
    }

    @Override
    public void addCelebrity(CelebrityRequest celebrity, MultipartFile multipartFile) {
        try{
            String fileName = storeFile(multipartFile, celebrity.getRole());
            Celebrity addCeleb = new Celebrity();
            addCeleb.setName(celebrity.getName());
            addCeleb.setBiography(celebrity.getBiography());
            addCeleb.setDescription(celebrity.getDescription());
            addCeleb.setNationality(celebrity.getNationality());
            addCeleb.setRole(celebrity.getRole());
            addCeleb.setDateOfBirth(celebrity.getDateOfBirth());
            addCeleb.setImage(fileName);
            celebrityRepository.save(addCeleb);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCelebrity(int id) {
        Celebrity celebrity = celebrityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid id" + id));
        celebrityRepository.delete(celebrity);
    }

    @Override
    public Celebrity getCelebrity(Integer id) {
        return celebrityRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid id"));
    }

    @Override
    public void updateCelebrity(int id, CelebrityRequest celebrity) {
        Celebrity celeb = getCelebrity(id);

        if (celebrity.getName() != null && !celebrity.getName().isEmpty()) {
            celeb.setName(celebrity.getName());
        }
        if (celebrity.getBiography() != null && !celebrity.getBiography().isEmpty()) {
            celeb.setBiography(celebrity.getBiography());
        }
        if (celebrity.getDescription() != null && !celebrity.getDescription().isEmpty()) {
            celeb.setDescription(celebrity.getDescription());
        }
        if (celebrity.getNationality() != null && !celebrity.getNationality().isEmpty()) {
            celeb.setNationality(celebrity.getNationality());
        }
        if (celebrity.getRole() != null) {
            celeb.setRole(celebrity.getRole());
        }
        if (celebrity.getDateOfBirth() != null) {
            celeb.setDateOfBirth(celebrity.getDateOfBirth());
        }
        celebrityRepository.save(celeb);
    }
}
