package com.cinemas.repositories;

import com.cinemas.entities.Celebrity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CelebrityRepository extends JpaRepository<Celebrity, Integer> {
}
