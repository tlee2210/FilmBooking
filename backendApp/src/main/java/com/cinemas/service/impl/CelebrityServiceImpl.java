package com.cinemas.service.impl;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.entity.Celebrity;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.service.CelebrityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CelebrityServiceImpl implements CelebrityService {
    @Autowired
    CelebrityRepository celebrityRepository;

    @Override
    public List<Celebrity> getAllCelebrity() {
        return celebrityRepository.findAll();
    }

    @Override
    public void addCelebrity(CelebrityRequest celebrity) {
        Celebrity addCeleb = new Celebrity();
        addCeleb.setName(celebrity.getName());
        addCeleb.setBiography(celebrity.getBiography());
        addCeleb.setDescription(celebrity.getDescription());
        addCeleb.setNationality(celebrity.getNationality());
        addCeleb.setRole(celebrity.getRole());
        addCeleb.setDateOfBirth(celebrity.getDateOfBirth());
        addCeleb.setImage(celebrity.getImage());
        celebrityRepository.save(addCeleb);
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
