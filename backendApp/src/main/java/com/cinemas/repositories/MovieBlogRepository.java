package com.cinemas.repositories;

import com.cinemas.entities.Celebrity;
import com.cinemas.entities.MovieBlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieBlogRepository extends JpaRepository<MovieBlog, Integer> {
    MovieBlog findByName(String name);

    MovieBlog findBySlug(String slug);

    @Query("SELECT b FROM MovieBlog b WHERE b.name = ?1 AND b.id != ?2")
    MovieBlog findByNameWithId(String name, int id);

    @Query("select b FROM MovieBlog b where (:name is null or b.name like %:name%)")
    List<MovieBlog> searchByName(String name);

    @Query("SELECT m FROM MovieBlog m ORDER BY m.id DESC LIMIT 4")
    List<MovieBlog> blogRelate();
}
