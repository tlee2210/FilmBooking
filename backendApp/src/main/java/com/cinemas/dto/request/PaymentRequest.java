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
}
