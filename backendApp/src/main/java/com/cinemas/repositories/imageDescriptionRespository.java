package com.cinemas.repositories;

import com.cinemas.dto.response.SelectOptionReponse;
import com.cinemas.entities.imageDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface imageDescriptionRespository extends JpaRepository<imageDescription, Integer> {
    @Query("SELECT i FROM imageDescription i WHERE i.url = ?1")
    imageDescription findByUrl(String url);

    @Query("SELECT i FROM imageDescription i WHERE i.slug_name = ?1")
    List<imageDescription> findBySlug_name(String slug);

    @Query("SELECT i FROM imageDescription i WHERE i.slug_name = null")
    List<imageDescription> findBySlug_nameNull();

    @Query("SELECT new com.cinemas.dto.response.SelectOptionReponse(i.slug, i.image) FROM  Promotion i JOIN (SELECT MIN(id) as id FROM Promotion GROUP BY slug) subquery " +
            "ON i.id = subquery.id ORDER BY i.id DESC LIMIT 3")
    List<SelectOptionReponse> getImageCarousel();
}
