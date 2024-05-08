package com.cinemas.service;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CelebrityService {
    Page<Celebrity> getAllCelebrity(PaginationHelper PaginationHelper);

    boolean addCelebrity(CelebrityRequest celebrity);

    List<SelectOptionReponse> getCreateCelebrity();

    boolean deleteCelebrity(int id) throws IOException;

    Celebrity getCelebrity(Integer id);

    void updateCelebrity(int id, CelebrityRequest celebrity, MultipartFile file);
}
