package com.cinemas.service.impl.home;

import com.cinemas.dto.response.HomeResponse;
import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Cinema;
import com.cinemas.entities.MovieBlog;
import com.cinemas.entities.Review;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.ReviewType;
import com.cinemas.repositories.CinemaRespository;
import com.cinemas.repositories.MovieBlogRepository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.repositories.ReviewRepository;
import com.cinemas.service.home.HomeService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

    @Override
    public HomeResponse getHomeInfo() {
        HomeResponse homeResponse = new HomeResponse();

        List<ItemIntroduce> movieShowings = movieRepository.getMovieHomePage(MovieStatus.NOW_SHOWING, 8);
        movieShowings.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });
        homeResponse.setMovieShowingList(movieShowings);


        List<ItemIntroduce> movieSoons = movieRepository.getMovieHomePage(MovieStatus.COMING_SOON, 8);
        movieSoons.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });
        homeResponse.setMovieSoonList(movieSoons);

        List<ItemIntroduce> reviews = reviewRepository.reviewRelate(ReviewType.review);
        reviews.forEach(review -> {
            review.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(review.getImageLandscape()));
        });

        homeResponse.setReviewList(reviews);

        List<ItemIntroduce> movieBlogs = movieBlogRepository.blogRelate();
        movieBlogs.forEach(blog -> {
            blog.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(blog.getImageLandscape()));
        });
        homeResponse.setMovieBlogList(movieBlogs);
        return homeResponse;
    }

    @Override
    public HomeResponse getNavbarInfo() {
        HomeResponse homeResponse = new HomeResponse();

        List<ItemIntroduce> movieShowings = movieRepository.getMovieHomePage(MovieStatus.NOW_SHOWING, 4);
        movieShowings.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });
        homeResponse.setMovieShowingList(movieShowings);


        List<ItemIntroduce> movieSoons = movieRepository.getMovieHomePage(MovieStatus.COMING_SOON, 4);
        movieSoons.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
        });
        homeResponse.setMovieSoonList(movieSoons);

        homeResponse.setSelectOptionList(cinemaRespository.selectCinema());
        return homeResponse;
    }
}
