package com.cinemas.dto.request;

import com.cinemas.enums.MovieStatus;
import com.cinemas.validator.DobConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Null;
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
    private int id;

    @NotEmpty(message = "VALIDATION")
    private String name;

    private int duration_movie;

    private int countryId;

    private String language;

    private String producer;

    private String description;

    private MovieStatus status;

    private MultipartFile imageLandscape;

    private MultipartFile imagePortrait;

    private String trailer;

    private String rules;

    private String movieFormat;

    @DobConstraint(min = 18, message = "INVALID_DATE")
    private LocalDate releaseDate;

    @DobConstraint(min = 18, message = "INVALID_DATE")
    private LocalDate endDate;

    private List<Integer> categoriesIds;

    private List<Integer> actorId;

    private List<Integer> directorId;
}
