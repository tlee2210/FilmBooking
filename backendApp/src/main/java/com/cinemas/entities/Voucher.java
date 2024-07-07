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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Voucher {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String code;

    @Column
    private DiscountType discountType;

    @Column
    private double discountValue;

    @Column
    private LocalDate expirationDate;

    @Column
    private Integer usageLimit;

    @Column
    private Integer usedCount;

    @Column
    private StatusVoucher statusVoucher;
}
