package com.cinemas.dto.request;

import com.cinemas.enums.StatusCinema;
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

    private Integer id;

    private String name;

    private String address;

    private String phone;

    private String description;

    private String city;

    private String lat;

    private String lng;

    private StatusCinema status;

    private List<MultipartFile> files;

    private List<Integer> images;
}
