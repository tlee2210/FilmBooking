package com.cinemas.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
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
public class CinemaRequest {

    private int id;

    private String name;

    private String address;

    private String phone;

    private String description;

    private int city_id;

//    private MultipartFile file;
    private List<MultipartFile> files;
}
