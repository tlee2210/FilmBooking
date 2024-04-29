package com.cinemas.dto.request;

import com.cinemas.validator.DobConstraint;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeRequest {
    private Integer id;
    @Size(min = 5, message = "USERNAME_INVALID")
    private String no;
    @Size(min = 5, message = "USERNAME_INVALID")
    private String name;
    @DobConstraint(min = 18, message = "INVALID_DOB")
    private LocalDate DOB;
}
