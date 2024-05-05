package com.cinemas.service;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.entities.Celebrity;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface CelebrityService {
    Page<Celebrity> getAllCelebrity(PaginationHelper PaginationHelper);
    void addCelebrity(CelebrityRequest celebrity, MultipartFile multipartFile);
    void deleteCelebrity(int id);
    Celebrity getCelebrity(Integer id);
    void updateCelebrity(int id, CelebrityRequest celebrity, MultipartFile file);
}
