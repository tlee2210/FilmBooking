package com.cinemas.dto.request;


import com.cinemas.enums.RoleCeleb;
import com.cinemas.validator.DobConstraint;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaterCornRequest {
    private int id;
    @NotEmpty(message = "VALIDATION")
    private String name;
    private Long price;
    private String description;
    private MultipartFile file;
}
