package com.cinemas.service.impl.home;

import com.cinemas.dto.response.HomeResponse;
import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieBlog;
import com.cinemas.entities.Review;
import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.ReviewType;
import com.cinemas.repositories.MovieBlogRepository;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.repositories.ReviewRepository;
import com.cinemas.service.admin.UploadFileService;
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

    @Override
    public HomeResponse getHomeInfo() {
        HomeResponse homeResponse = new HomeResponse();

        List<Movie> movieShowings = movieRepository.getMovieHomePage(MovieStatus.NOW_SHOWING);
        movieShowings.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });
        homeResponse.setMovieShowingList(movieShowings);

        List<Movie> movieSoons = movieRepository.getMovieHomePage(MovieStatus.COMING_SOON);
        movieSoons.forEach(movie -> {
            movie.setImageLandscape(fileStorageServiceImpl.getUrlFromPublicId(movie.getImageLandscape()));
            movie.setImagePortrait(fileStorageServiceImpl.getUrlFromPublicId(movie.getImagePortrait()));
        });
        homeResponse.setMovieSoonList(movieSoons);

        List<Review> reviews = reviewRepository.reviewRelate(ReviewType.review);
        reviews.forEach(review -> {
            review.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(review.getThumbnail()));

            String fullDescription = review.getDescription();
            int firstPeriodIndex = fullDescription.indexOf('.');

            if (firstPeriodIndex != -1) {
                String shortDescription = fullDescription.substring(0, firstPeriodIndex + 1);
                review.setDescription(shortDescription);
            } else {
                review.setDescription(fullDescription);
            }
        });
        homeResponse.setReviewList(reviews);

        List<MovieBlog> movieBlogs = movieBlogRepository.blogRelate();
        movieBlogs.forEach(blog -> {
            blog.setThumbnail(fileStorageServiceImpl.getUrlFromPublicId(blog.getThumbnail()));

            String fullDescription = blog.getDescription();
            int firstPeriodIndex = fullDescription.indexOf('.');

            if (firstPeriodIndex != -1) {
                String shortDescription = fullDescription.substring(0, firstPeriodIndex + 1);
                blog.setDescription(shortDescription);
            } else {
                blog.setDescription(fullDescription);
            }
        });
        homeResponse.setMovieBlogList(movieBlogs);
        return homeResponse;
    }
}
