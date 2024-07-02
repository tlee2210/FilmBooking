package com.cinemas.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PromotionRequest {
    private Integer id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @NotEmpty
    private MultipartFile image;
}
