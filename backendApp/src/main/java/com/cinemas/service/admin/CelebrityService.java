package com.cinemas.service.admin;

import com.cinemas.dto.request.CelebrityRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.response.EditSelectOptionReponse;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CelebrityService {
    Page<Celebrity> getAllCelebrity(SearchRequest PaginationHelper);

    boolean addCelebrity(CelebrityRequest celebrity) throws IOException;

    List<SelectOptionReponse> getCreateCelebrity();

    Integer deleteCelebrity(String slug) throws IOException;

    EditSelectOptionReponse<Celebrity> getEditCelebrityBySlug(String slug);

    boolean updateCelebrity(CelebrityRequest celebrity) throws IOException;
}
