package com.cinemas.service.home;

import com.cinemas.dto.response.HomeResponse;
import com.cinemas.dto.response.HomeResponse2;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Movie;

import java.util.List;

public interface HomeMovieSerivce {

    HomeResponse getAllMovie();

    HomeResponse2 getAllMovie2();

    Movie getMoiveBySlug(String slug);

    List<ItemIntroduce> getMovieActiveLimitIntroduce();
}
