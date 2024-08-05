package com.cinemas.dto.request;

import com.cinemas.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SignUpRequest {

    @NotEmpty(message = "VALIDATION")
    @Email(message = "INVALID_EMAIL")
    private String email;

    @NotEmpty(message = "VALIDATION")
    private String name;

    @NotEmpty(message = "VALIDATION")
    private String phone;

//    @NotEmpty(message = "VALIDATION")
    private LocalDate DOB;

//    @NotEmpty(message = "VALIDATION")
    private Gender gender;

    @Size(min = 5, max = 20, message = "FIELD_TOO_LENGTH")
    @NotEmpty(message = "VALIDATION")
    private String password;

}
