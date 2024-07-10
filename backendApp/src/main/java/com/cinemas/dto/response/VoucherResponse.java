package com.cinemas.dto.response;

import com.cinemas.enums.DiscountType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VoucherResponse {
    private Integer id;
    private DiscountType discountType;
    private double discountValue;
    private Double maxDiscount = null;
}
