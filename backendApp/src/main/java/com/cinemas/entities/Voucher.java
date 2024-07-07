package com.cinemas.entities;

import com.cinemas.enums.DiscountType;
import com.cinemas.enums.StatusVoucher;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class Voucher {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String code = null;

    @Column
    private DiscountType discountType= null;

    @Column(nullable = false)
    private double discountValue;

    @Column
    private LocalDate expirationDate= null;

    @Column
    private Integer usageLimit= null;

    @Column
    private Integer usedCount= null;

    @Column
    private Double minSpend = null;

    @Column
    private StatusVoucher statusVoucher;
}
