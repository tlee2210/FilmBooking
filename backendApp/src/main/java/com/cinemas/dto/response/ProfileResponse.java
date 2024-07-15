package com.cinemas.dto.response;

import com.cinemas.enums.Gender;
import com.cinemas.enums.RoleType;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ProfileResponse {
    private int id;

    private String name;

    private String email;

    private String phone;

    private LocalDate DOB;

    private Gender gender;

    private RoleType role;

    private String avatar;

    private List<PaymentResponse> paymentList;
}
