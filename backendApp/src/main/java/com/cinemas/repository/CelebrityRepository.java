package com.cinemas.repository;

import com.cinemas.entity.Celebrity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CelebrityRepository extends JpaRepository<Celebrity, Integer> {
}
