package com.cinemas.service.home;

import com.cinemas.dto.request.SearchCelebRequest;
import com.cinemas.dto.response.CelebResponse;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.dto.response.SelectOptionCeleb;
import com.cinemas.entities.Celebrity;
import org.springframework.data.domain.Page;

public interface HomeCelebService {
    SelectOptionCeleb<Page<Celebrity>> getAllActor(SearchCelebRequest searchCelebRequest);

    SelectOptionCeleb<Page<Celebrity>> getAllDirector(SearchCelebRequest searchCelebRequest);

    CelebResponse getDetailCeleb(String slug);
}
