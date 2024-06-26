package com.cinemas.repositories;

import com.cinemas.dto.response.ItemIntroduce;
import com.cinemas.entities.Movie;
import com.cinemas.enums.MovieStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m FROM Movie m " +
            "JOIN FETCH m.country co " +
            "LEFT JOIN FETCH m.categories g")
    List<Movie> findAllWithBasicDetail();

    @Query("SELECT m FROM Movie m WHERE (:name is null or m.name like %:name%)" +
            "AND (:countryId is null or m.country.id = :countryId)" +
            "AND (:status is null or m.status = :status)")
    List<Movie> searchMovie(String name, Integer countryId, MovieStatus status);

    Movie findByName(String name);

//    @Query("SELECT m FROM Movie m INNER JOIN Celebrity ON m = Celebrity.m WHERE m.slug = ?1")
    Movie findBySlug(String slug);

    @Query("SELECT m FROM Movie m WHERE m.name = ?1 AND m.id != ?2")
    Movie findByNameWithId(String name, int id);

    @Query(value = "SELECT m FROM Movie m WHERE m.status = :status ORDER BY RAND() LIMIT :num")
    List<Movie> getLimitMovie(MovieStatus status, Integer num);

    @Query(value = "SELECT m FROM Movie m WHERE m.status = :status")
    List<Movie> getMovieForStatus(MovieStatus status);

    @Query(value = "SELECT m FROM Movie m WHERE m.status = :status ORDER BY RAND() LIMIT 3")
    List<Movie> getMovieForStatusIntroduce(MovieStatus status);

    @Query("SELECT m FROM Movie m WHERE m.endDate > CURRENT_DATE")
    List<Movie>findAllMovieSetTime();

    @Query("SELECT new com.cinemas.dto.response.ItemIntroduce(m.id, m.name, m.slug, m.imagePortrait) FROM Movie m WHERE m.status = :status ORDER BY m.id DESC LIMIT :num")
    List<ItemIntroduce> getMovieHomePage(MovieStatus status, int num);
}
