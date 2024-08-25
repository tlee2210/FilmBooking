package com.cinemas.job;

import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import com.cinemas.repositories.MovieRepository;
import com.cinemas.service.admin.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
public class MovieTasks {
    @Autowired
    private MovieRepository movieRepository;

    @Scheduled(cron = "0 0 0 * * *")
//    @Scheduled(cron = "*/10 * * * * *")
    public void checkMovieCurrentTime(){
        List<Movie> movieCommingSoon = movieRepository.getMovieForStatus2(MovieStatus.COMING_SOON);
        movieCommingSoon.forEach(movie -> {

            LocalDate localDate = LocalDate.now();
            if (movie.getReleaseDate().isEqual(localDate) || movie.getReleaseDate().isBefore(localDate)) {
                movie.setStatus(MovieStatus.NOW_SHOWING);
            }
        });
        movieRepository.saveAll(movieCommingSoon);

    }

    @Scheduled(cron = "0 0 0 * * *")
//    @Scheduled(cron = "*/10 * * * * *")
    public void checkMovieNowShowing(){
        List<Movie> movieNowShowing = movieRepository.getMovieForStatus2(MovieStatus.NOW_SHOWING);
        movieNowShowing.forEach(movie -> {

            LocalDate localDate = LocalDate.now();
            if (movie.getEndDate().isEqual(localDate) || movie.getEndDate().isBefore(localDate)) {
                movie.setStatus(MovieStatus.NO_LONGER_SHOWING);

            }
        });
        movieRepository.saveAll(movieNowShowing);

    }
}
