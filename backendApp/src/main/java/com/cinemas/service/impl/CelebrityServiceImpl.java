package com.cinemas.service.impl;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.CountryRepository;
import com.cinemas.service.CelebrityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.cinemas.exception.ErrorCode.*;

@Service
public class CelebrityServiceImpl implements CelebrityService {
    @Autowired
    CelebrityRepository celebrityRepository;
    @Autowired
    CountryRepository countryRepository;
    @Autowired
    FileStorageService fileStorageService;

    private String storeFile(MultipartFile file, RoleCeleb role) throws IOException {
        if (file != null && !file.isEmpty()) {
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
    public Page<Celebrity> getAllCelebrity(PaginationHelper PaginationHelper) {
        List<Celebrity> celebrityList = celebrityRepository.findAllWithCountry();

        celebrityList.forEach(celebrity -> {
            String imageUrl = fileStorageService.getUrlFromPublicId(celebrity.getImage());
            celebrity.setImage(imageUrl);
        });

        PagedListHolder<Celebrity> pagedListHolder = new PagedListHolder<Celebrity>(celebrityList);
        pagedListHolder.setPage(PaginationHelper.getPageNo());
        pagedListHolder.setPageSize(PaginationHelper.getPageSize());

        List<Celebrity> pageList = pagedListHolder.getPageList();
        boolean ascending = PaginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(PaginationHelper.getSortByColumn(), true, ascending));

        Page<Celebrity> celebrities = new PageImpl<>(pageList, new PaginationHelper().getPageable(PaginationHelper), celebrityList.size());

        return celebrities;
    }

    @Override
    public boolean addCelebrity(CelebrityRequest celebrity) {
        try {
            Celebrity addCeleb = new Celebrity();

            ObjectUtils.copyFields(celebrity, addCeleb);

            int CountryId = Integer.parseInt(celebrity.getNationality());
            Country Country = countryRepository.findById(CountryId);

            addCeleb.setCountry(Country);
            addCeleb.setImage(fileStorageService.uploadFile(celebrity.getFile(), String.valueOf(celebrity.getRole())));
//            System.out.println(addCeleb);
            celebrityRepository.save(addCeleb);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<SelectOptionReponse> getCreateCelebrity() {
        List<Country> countryList = countryRepository.findAll();
        List<SelectOptionReponse> options = new ArrayList<>();
        for (Country country : countryList) {
            options.add(new SelectOptionReponse(country.getId(), country.getName()));
        }
        return options;
    }

    @Override
    public boolean deleteCelebrity(int id) throws IOException {
        Celebrity celebrity = celebrityRepository.findById(id)
                .orElseThrow(() -> new AppException(CELEBRITY_EXISTED));

        fileStorageService.deleteFile(celebrity.getImage());
        celebrityRepository.delete(celebrity);

        return true;
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

            if (file != null && !file.isEmpty()) {
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
//                celeb.setNationality(celebrity.getNationality());
            }
            if (celebrity.getRole() != null) {
                celeb.setRole(celebrity.getRole());
            }
            if (celebrity.getDateOfBirth() != null) {
                celeb.setDateOfBirth(celebrity.getDateOfBirth());
            }
            celebrityRepository.save(celeb);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
