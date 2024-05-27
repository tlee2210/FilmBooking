package com.cinemas.dto.request;

import com.cinemas.enums.Gender;
import com.cinemas.enums.RoleType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private int id;
    @NotEmpty
    private String name;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String phone;

    @NotEmpty
    private LocalDate DOB;

    @NotEmpty
    private Gender gender;

    @NotEmpty
    private RoleType role;
}
