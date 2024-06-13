package com.cinemas.repositories;

import com.cinemas.entities.Celebrity;
import com.cinemas.entities.MovieBlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MovieBlogRepository extends JpaRepository<MovieBlog, Integer> {
    MovieBlog findByName(String name);

    MovieBlog findBySlug(String slug);

    @Query("SELECT b FROM MovieBlog b WHERE b.name = ?1 AND b.id != ?2")
    MovieBlog findByNameWithId(String name, int id);
}
