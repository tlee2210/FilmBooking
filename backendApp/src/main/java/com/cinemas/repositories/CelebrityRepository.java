package com.cinemas.repositories;

import com.cinemas.entities.Celebrity;
import com.cinemas.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CelebrityRepository extends JpaRepository<Celebrity, Integer> {
    @Query("SELECT c FROM Celebrity c JOIN FETCH c.country")
    List<Celebrity> findAllWithCountry();

    @Query("SELECT c FROM Celebrity c WHERE c.name = ?1")
    Celebrity findByName(String name);
    @Query("SELECT c FROM Celebrity c WHERE c.name = ?1 AND c.id != ?2")
    Celebrity findByNameWithId(String name, int id);

    @Query("SELECT c FROM Celebrity c WHERE c.slug = ?1")
    Celebrity findBySlug(String slug);
}
