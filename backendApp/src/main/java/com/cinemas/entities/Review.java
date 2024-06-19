package com.cinemas.entities;

import com.cinemas.enums.ReviewType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @Column
    private ReviewType type;

    @Column
    private Integer views = 0;

    @Column
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String thumbnail;
}
