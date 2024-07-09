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
    private String code = null;

    @Column
    private DiscountType discountType= null; //Loại giảm giá

    @Column(nullable = false)
    private double discountValue; //Giá trị chiết khấu

    @Column
    private LocalDate expirationDate= null; //ngày hết hạn

    @Column
    private Integer usageLimit= null; //giới hạn sử dụng

    @Column
    private Integer usedCount= null; //đã sử dụng

    @Column
    private Double minSpend = null; //chi tiêu tối thiểu

    @Column
    private Double maxDiscount = null; //giảm giá tối đa

    @Column
    private StatusVoucher statusVoucher; //trạng thái Voucher
}
