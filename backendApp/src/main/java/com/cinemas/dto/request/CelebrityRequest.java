package com.cinemas.dto.request;

import com.cinemas.enums.RoleCeleb;
import com.cinemas.validator.DobConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Null;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CelebrityRequest {
    @NotEmpty(message = "VALIDATION")
    private String name;

    @DobConstraint(min = 18, message = "INVALID_DOB")
    private LocalDate dateOfBirth;

    private String nationality;

    private String biography;

    private String description;

//    @NotEmpty(message = "VALIDATION")
    private RoleCeleb role;

    private MultipartFile file;
}
