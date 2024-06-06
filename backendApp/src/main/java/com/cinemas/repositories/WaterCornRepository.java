package com.cinemas.repositories;

import com.cinemas.entities.Celebrity;
import com.cinemas.entities.WaterCorn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WaterCornRepository extends JpaRepository<WaterCorn, Integer> {
    WaterCorn findByName(String name);

    @Query("SELECT w FROM WaterCorn w WHERE w.name = ?1 AND w.id != ?2")
    WaterCorn findByNameWithId(String name, int id);

    @Query("SELECT w FROM WaterCorn w WHERE w.slug = ?1")
    WaterCorn findBySlug(String slug);
    @Query("SELECT w FROM WaterCorn w WHERE (:name is null or w.name like %:name%)")
    List<WaterCorn>searchByName(String name);
}