package com.cinemas.dto.response;

import com.cinemas.enums.RoleType;
import lombok.Data;

@Data
public class UserSignInRepose {
    private String name;
    private String email;
    private RoleType role;
}
