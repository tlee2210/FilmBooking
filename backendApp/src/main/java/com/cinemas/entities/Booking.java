package com.cinemas.entities;

import com.cinemas.enums.PaymentType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Booking {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String orderId;

    @Column
    private String paymentId;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingWaterCorn> bookingWaterCorn;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @Column
    private String quantitySeat;

    @Column
    private String quantityDoubleSeat;

    @Column
    private Float totalPrice;

    @Column
    private PaymentType paymentType;

    @ManyToOne()
    @JoinColumn(name = "showtime_id")
    private Showtimes showtime;

    @Column
    private LocalDate createAt;
}
