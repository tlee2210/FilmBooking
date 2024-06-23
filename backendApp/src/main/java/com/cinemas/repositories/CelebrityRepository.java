package com.cinemas.repositories;

import com.cinemas.entities.Celebrity;
import com.cinemas.entities.User;
import com.cinemas.enums.RoleCeleb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    //    @Query("SELECT c FROM Celebrity c JOIN FETCH c.country WHERE c.name LIKE %?1%")
    @Query("SELECT c FROM Celebrity AS c JOIN FETCH c.country " +
            "WHERE (:name is null or c.name LIKE %:name%) " +
            "AND (:role is null or c.role = :role)")
    List<Celebrity> searchCelebrity(@Param("name") String name, @Param("role") RoleCeleb role);

    @Query("SELECT c FROM Celebrity c WHERE c.role = ?1")
    List<Celebrity> findByRole(RoleCeleb role);

    @Query("SELECT c FROM Celebrity c WHERE c.role = :role " +
            "AND (:countrySlug is null or c.country.slug = :countrySlug)")
    List<Celebrity> searchCelebAndCountry(RoleCeleb role, String countrySlug);
}
