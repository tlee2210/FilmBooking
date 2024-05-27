package com.cinemas.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieGenreRequest {
    private int id;

    @NotEmpty(message = "VALIDATION")
    private String name;
}
