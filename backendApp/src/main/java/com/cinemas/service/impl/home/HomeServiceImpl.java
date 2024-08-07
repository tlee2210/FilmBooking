package com.cinemas.service.impl.home;

import com.cinemas.dto.response.HomeResponse;
import com.cinemas.dto.response.HomeSliderResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.MovieBlog;
import com.cinemas.entities.Review;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.ReviewType;
import com.cinemas.repositories.*;
import com.cinemas.service.home.HomeService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HomeServiceImpl implements HomeService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieBlogRepository movieBlogRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Autowired
    private CinemaRespository cinemaRespository;

    @Autowired
    private imageDescriptionRespository imageDescriptionRespository;

    @Override
    public HomeResponse getHomeInfo() {
        HomeResponse homeResponse = new HomeResponse();

        List<ItemIntroduce> movieShowings = movieRepository.getMovieHomePage(MovieStatus.NOW_SHOWING, 8);
        movieShowings.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });
        homeResponse.setMovieShowingList(movieShowings);


        List<ItemIntroduce> movieSoons = movieRepository.getMovieHomePage(MovieStatus.COMING_SOON, 8);
        movieSoons.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });
        homeResponse.setMovieSoonList(movieSoons);

        List<ItemIntroduce> reviews = reviewRepository.reviewRelate(ReviewType.review);
        reviews.forEach(review -> {
            review.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(review.getImagePortrait()));
        });

        homeResponse.setReviewList(reviews);

        List<ItemIntroduce> movieBlogs = movieBlogRepository.blogRelate();
        movieBlogs.forEach(blog -> {
            blog.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(blog.getImagePortrait()));
        });
        homeResponse.setMovieBlogList(movieBlogs);

        HomeSliderResponse homeSliderResponse = new HomeSliderResponse();
        List<SelectOptionReponse> imagePromotions = imageDescriptionRespository.getImageCarousel();
        imagePromotions.forEach(image -> {
            image.setLabel(fileStorageServiceImpl.getUrlFromPublicId(image.getLabel()));
        });

        homeSliderResponse.setImagePromotions(imagePromotions);

        List<SelectOptionReponse> imageMovies = movieRepository.getImageCarousel();
        imageMovies.forEach(imageMovie -> {
            imageMovie.setLabel(fileStorageServiceImpl.getUrlFromPublicId(imageMovie.getLabel()));
        });
        homeSliderResponse.setImageMovies(imageMovies);

        homeResponse.setSlider(homeSliderResponse);
        return homeResponse;
    }

    @Override
    public HomeResponse getNavbarInfo() {
        HomeResponse homeResponse = new HomeResponse();

        List<ItemIntroduce> movieShowings = movieRepository.getMovieHomePage(MovieStatus.NOW_SHOWING, 4);
        movieShowings.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });
        homeResponse.setMovieShowingList(movieShowings);


        List<ItemIntroduce> movieSoons = movieRepository.getMovieHomePage(MovieStatus.COMING_SOON, 4);
        movieSoons.forEach(movie -> {
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });
        homeResponse.setMovieSoonList(movieSoons);


        homeResponse.setSelectOptionList(cinemaRespository.selectCinema());
        return homeResponse;
    }
}
