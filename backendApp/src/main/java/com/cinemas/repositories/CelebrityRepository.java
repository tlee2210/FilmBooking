package com.cinemas.repositories;

import com.cinemas.entities.Celebrity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CelebrityRepository extends JpaRepository<Celebrity, Integer> {
    @Query("SELECT c FROM Celebrity c JOIN FETCH c.country")
    List<Celebrity> findAllWithCountry();
}
