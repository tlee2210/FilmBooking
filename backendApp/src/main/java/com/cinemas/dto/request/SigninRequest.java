package com.cinemas.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SigninRequest {
    @NotEmpty(message = "email not null")
    private String email;
    @NotEmpty(message = "password not null")
    @Size(min = 3, message = "USERNAME_INVALID")
    private String password;
}
