package com.cinemas.repositories;

import com.cinemas.entities.User;

import com.cinemas.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    User findByRole(RoleType role);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?2 where u.id = ?1")
    void updatePassword(int id, String password);
}
