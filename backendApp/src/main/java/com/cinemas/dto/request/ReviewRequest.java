package com.cinemas.dto.request;

import com.cinemas.enums.ReviewType;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequest {
    private int id;

    @NotEmpty(message = "VALIDATION")
    private String name;

    @NotEmpty
    private String description;

    private ReviewType type;

    private List<String> url;

    @NotEmpty
    private MultipartFile file;
}
