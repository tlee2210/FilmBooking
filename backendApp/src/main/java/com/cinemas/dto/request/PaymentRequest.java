package com.cinemas.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Null;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentRequest {
    private Integer id;

    private String orderId;

    private String paymentId;

    private List<String> quantitySeat;

    private List<String> quantityDoubleSeat;

    private Float totalPrice;

    private Integer showtimeId;

    private Integer voucherId;

    private List<BookingWaterRequest> quantityWater;

    public PaymentRequest(String orderId, String paymentId, List<String> quantitySeat, List<String> quantityDoubleSeat, Float totalPrice, Integer showtimeId, Integer voucherId, List<BookingWaterRequest> quantityWater) {
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.quantitySeat = quantitySeat;
        this.quantityDoubleSeat = quantityDoubleSeat;
        this.totalPrice = totalPrice;
        this.showtimeId = showtimeId;
        this.voucherId = voucherId;
        this.quantityWater = quantityWater;
    }
}
