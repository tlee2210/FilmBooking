package com.cinemas.dto.request;

import com.cinemas.enums.DiscountType;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;

@Data
public class VoucherRequest {
    private int id;

    private String code;

    private DiscountType discountType;

    private double discountValue;

    private LocalDate expirationDate;

    private Integer usageLimit;
}
