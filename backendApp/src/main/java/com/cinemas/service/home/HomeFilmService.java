package com.cinemas.service.home;

import com.cinemas.dto.request.SearchFilmRequest;
import com.cinemas.dto.response.HomeFilmResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.dto.response.SelectOptionAndModelReponse;
import com.cinemas.entities.Movie;
import org.springframework.data.domain.Page;

public interface HomeFilmService {
    SelectOptionAndModelReponse<Page<ItemIntroduce>> getAllFilms(SearchFilmRequest searchFilmRequest);
    HomeFilmResponse getFilmDetail(String slug);
}
