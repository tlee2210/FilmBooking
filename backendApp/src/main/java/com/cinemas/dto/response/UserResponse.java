package com.cinemas.dto.response;

import com.cinemas.enums.Gender;
import com.cinemas.enums.RoleType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
//@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private int id;

    private String name;

    private String email;

    private String phone;

    private LocalDate DOB;

    private Gender gender;

    private RoleType role;

    private String avatar;

    public UserResponse(int id, String name, String email, String phone, LocalDate DOB, Gender gender, RoleType role, String avatar) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.DOB = DOB;
        this.gender = gender;
        this.role = role;
        this.avatar = avatar;
    }
}
