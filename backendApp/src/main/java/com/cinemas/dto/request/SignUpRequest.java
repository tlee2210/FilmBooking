package com.cinemas.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

    @NotEmpty(message = "VALIDATION")
    private String name;

    @NotEmpty(message = "VALIDATION")
    @Email(message = "INVALID_EMAIL")
    private String email;

    @Size(min = 5, max = 10, message = "FIELD_TOO_LENGTH")
    @NotEmpty(message = "VALIDATION")
    private String password;
}
