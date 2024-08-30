package com.cinemas.repositories;

import com.cinemas.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    List<Voucher> findByExpirationDateBefore(LocalDate localDate);
    @Query("SELECT v FROM Voucher v WHERE v.code = :code")
    Voucher findByCode(String code);
    @Query("SELECT v FROM Voucher v WHERE v.code = :code AND v.id != :id")
    Voucher findByCodeAndId(String code, Integer id);
}
