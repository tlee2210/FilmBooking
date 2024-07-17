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

    private List<BookingResponse> bookingList;
}
