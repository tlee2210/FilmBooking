package com.cinemas.repositories;

import com.cinemas.entities.imageDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface imageDescriptionRespository extends JpaRepository<imageDescription, Integer> {
    @Query("SELECT i FROM imageDescription i WHERE i.url = ?1")
    imageDescription findByUrl(String url);

    @Query("SELECT i FROM imageDescription i WHERE i.slug_name = ?1")
    List<imageDescription> findBySlug_name(String slug);
}
