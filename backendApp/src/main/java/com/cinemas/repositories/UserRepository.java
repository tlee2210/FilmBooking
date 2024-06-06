package com.cinemas.repositories;

import com.cinemas.entities.Movie;
import com.cinemas.entities.MovieGenre;
import com.cinemas.entities.User;

import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    User findByRole(RoleType role);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?2 where u.id = ?1")
    void updatePassword(int id, String password);

    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.id != ?2")
    User findByEmailWithId(String name, int id);

    @Query("SELECT u FROM User u WHERE (:name is null or u.name like %:name%)" +
            "AND (:role is null or u.role = :role) " +
            "AND u.role != RoleType.ADMIN")
    List<User> searchUser(@Param("name") String name, @Param("role") RoleType role);

    @Query("SELECT DISTINCT u.role FROM User AS u")
    List<String> findByRole();
}
