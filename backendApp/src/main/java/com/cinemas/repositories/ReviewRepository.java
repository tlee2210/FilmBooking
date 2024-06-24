package com.cinemas.repositories;

import com.cinemas.entities.Review;
import com.cinemas.entities.WaterCorn;
import com.cinemas.enums.ReviewType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("SELECT r FROM Review  r WHERE (:role is null or r.type = :role)")
    List<Review> findByType(ReviewType role);

    @Query("SELECT r FROM Review r WHERE r.slug = ?1")
    Review findBySlug(String slug);

    @Query("SELECT r FROM Review r WHERE r.name = ?1 AND r.id != ?2")
    WaterCorn findByNameWithId(String name, int id);

    Review findByName(String name);

    @Query("SELECT r FROM Review r WHERE (:name is null or r.name like %:name%) " +
            "AND (:role is null or r.type = :role)")
    List<Review> searchByName(String name, ReviewType role);

    @Query("SELECT r FROM Review r WHERE r.type = :type ORDER BY r.id DESC LIMIT 4")
    List<Review> reviewRelate(ReviewType type);
}
