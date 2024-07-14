package com.cinemas.entities;

import com.cinemas.enums.DiscountType;
import com.cinemas.enums.StatusVoucher;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>();
}
