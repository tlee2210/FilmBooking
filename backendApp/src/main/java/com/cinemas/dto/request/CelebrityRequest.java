package com.cinemas.dto.request;

import com.cinemas.enums.RoleCeleb;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
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

    private LocalDate dateOfBirth;

    private String nationality;

    private String biography;

    private String description;

    @NotEmpty(message = "VALIDATION")
    private RoleCeleb role;

    private String image;

    private MultipartFile file;
}
