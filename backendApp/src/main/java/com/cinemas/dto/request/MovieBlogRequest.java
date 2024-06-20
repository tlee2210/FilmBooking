package com.cinemas.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class MovieBlogRequest {
    private Integer id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    private List<String> url;

    @NotEmpty
    private MultipartFile file;
}
