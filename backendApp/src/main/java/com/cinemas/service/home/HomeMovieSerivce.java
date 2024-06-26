package com.cinemas.service.home;

import com.cinemas.dto.response.HomeResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Movie;

import java.util.List;

public interface HomeMovieSerivce {

    HomeResponse getAllMovie();

    Movie getMoiveBySlug(String slug);

    List<ItemIntroduce> getMovieActiveLimitIntroduce();
}
