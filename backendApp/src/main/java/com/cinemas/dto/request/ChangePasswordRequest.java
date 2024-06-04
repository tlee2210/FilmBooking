package com.cinemas.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    @NotEmpty
    private String password;

    @NotEmpty
    private String repeatPassword;

    @NotEmpty
    private String newPassword;
}
