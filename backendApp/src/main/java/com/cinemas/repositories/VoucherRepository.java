package com.cinemas.repositories;

import com.cinemas.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    List<Voucher> findByExpirationDateBefore(LocalDate localDate);
}
