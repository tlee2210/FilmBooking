package com.cinemas.repositories;

import com.cinemas.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CityRepository extends JpaRepository<City, Integer> {
    @Query("SELECT c FROM City c WHERE c.name = ?1")
    City findByName(String name);
    @Query("SELECT c FROM City c WHERE c.name = ?1 AND c.id != ?2")
    City findByNameWithId(String name, int id);
}
