package com.cinemas.service;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.entity.Celebrity;

import java.util.List;

public interface CelebrityService {
    List<Celebrity> getAllCelebrity();
    void addCelebrity(CelebrityRequest celebrity);
    void deleteCelebrity(int id);
    Celebrity getCelebrity(Integer id);
    void updateCelebrity(int id, CelebrityRequest celebrity);
}
