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
        if(file != null && !file.isEmpty()){
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            String roleCeleb = role == RoleCeleb.ACTOR ? "actor" : "director";
            String uploadDir = "images/" + roleCeleb;
            String absoluteUploadDir = System.getProperty("user.dir") + "/src/main/java/com/cinemas/" + uploadDir;
            Path uploadPath = Paths.get(absoluteUploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return uniqueFileName;
        }
        return "";
    }

    private void deleteExistingImage(String imagePath, RoleCeleb role) {
        if (imagePath != null && !imagePath.isEmpty()) {
            try {
                String roleCeleb = role == RoleCeleb.ACTOR ? "actor" : "director";
                String uploadDir = "images/" + roleCeleb;
                String absoluteUploadDir = System.getProperty("user.dir") + "/src/main/java/com/cinemas/" + uploadDir;
                Path root = Paths.get(absoluteUploadDir);
                Path file = root.resolve(imagePath);
                Files.deleteIfExists(file);
            } catch (IOException e) {
                System.err.println("Failed to delete image: " + imagePath);
                e.printStackTrace();
            }
        }
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
        if (celebrity != null){
            deleteExistingImage(celebrity.getImage(), celebrity.getRole());
            celebrityRepository.delete(celebrity);
        }
    }

    @Override
    public Celebrity getCelebrity(Integer id) {
        return celebrityRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid id"));
    }

    @Override
    public void updateCelebrity(int id, CelebrityRequest celebrity, MultipartFile file) {
        try {
            Celebrity celeb = getCelebrity(id);

            if(file != null && !file.isEmpty()){
                deleteExistingImage(celeb.getImage(), celeb.getRole());
                celeb.setImage(storeFile(file, celebrity.getRole()));
            }

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
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
