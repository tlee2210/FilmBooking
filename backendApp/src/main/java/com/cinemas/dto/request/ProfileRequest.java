package com.cinemas.dto.request;

import com.cinemas.enums.Gender;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest {
    @NotEmpty
    private String name;

    @NotEmpty
    private String email;

    @NotEmpty
    private String phone;

    @NotEmpty
    private LocalDate DOB;

    @NotEmpty
    private Gender gender;
}
