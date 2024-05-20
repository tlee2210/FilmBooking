package com.cinemas.dto.request;

import com.cinemas.validator.DobConstraint;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieRequest {
    @NotEmpty(message = "VALIDATION")
    private String name;

    private int duration;

    private int countryId;

    private String language;

    private String producer;

    private String movieContent;

    private MultipartFile image;

    private MultipartFile trailer;

    private String rules;

    private String type;

    @DobConstraint(min = 18, message = "INVALID_DATE")
    private LocalDate releaseDate;

    @DobConstraint(min = 18, message = "INVALID_DATE")
    private LocalDate endDate;

    private List<Integer> genreIds;

    private List<Integer> celebrityIds;

    private List<Integer> cinemaIds;
}
