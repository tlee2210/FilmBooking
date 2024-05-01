package com.cinemas.repositories;

import com.cinemas.entities.ForgotPassword;
import com.cinemas.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {
    @Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);
    @Query("select fp from ForgotPassword fp where fp.user = ?1")
    ForgotPassword existsByUserId(User user);
}
