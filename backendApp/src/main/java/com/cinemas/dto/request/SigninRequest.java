package com.cinemas.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SigninRequest {
    
    @NotEmpty(message = "VALIDATION")
    @Email(message = "INVALID_EMAIL")
    private String email;

    @Size(min = 5, message = "FIELD_TOO_LENGTH")
    @NotEmpty(message = "VALIDATION")
    private String password;
}
