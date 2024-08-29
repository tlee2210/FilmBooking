package com.cinemas.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Null;
import lombok.Data;

import java.util.List;

//@Data
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public List<String> getQuantitySeat() {
        return quantitySeat;
    }

    public void setQuantitySeat(List<String> quantitySeat) {
        this.quantitySeat = quantitySeat;
    }

    public List<String> getQuantityDoubleSeat() {
        return quantityDoubleSeat;
    }

    public void setQuantityDoubleSeat(List<String> quantityDoubleSeat) {
        this.quantityDoubleSeat = quantityDoubleSeat;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Integer showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Integer getVoucherId() {
        return voucherId;
    }

    public void setVoucherId(Integer voucherId) {
        this.voucherId = voucherId;
    }

    public List<BookingWaterRequest> getQuantityWater() {
        return quantityWater;
    }

    public void setQuantityWater(List<BookingWaterRequest> quantityWater) {
        this.quantityWater = quantityWater;
    }
}
