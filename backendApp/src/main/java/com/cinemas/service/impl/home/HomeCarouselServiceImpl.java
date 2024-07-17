package com.cinemas.service.impl.home;

import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.repositories.imageDescriptionRespository;
import com.cinemas.service.home.HomeCarouselService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HomeCarouselServiceImpl implements HomeCarouselService {
    @Autowired
    private imageDescriptionRespository imageDescriptionRespository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public List<SelectOptionReponse> getHomeCarousel() {
//        HomeCarouselResponse homeCarouselResponse = new HomeCarouselResponse();

        List<SelectOptionReponse> homeCarouselResponse = new ArrayList<>();
        List<SelectOptionReponse> imagePromotions = imageDescriptionRespository.getImageCarousel();
        imagePromotions.forEach(image -> {
            image.setLabel(fileStorageServiceImpl.getUrlFromPublicId(image.getLabel()));
            homeCarouselResponse.add(image);
        });

        List<SelectOptionReponse> imageMovies = movieRepository.getImageCarousel();
        imageMovies.forEach(imageMovie -> {
            imageMovie.setLabel(fileStorageServiceImpl.getUrlFromPublicId(imageMovie.getLabel()));
            homeCarouselResponse.add(imageMovie);
        });
        return homeCarouselResponse;
    }
}
