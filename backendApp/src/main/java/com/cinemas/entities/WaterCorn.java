package com.cinemas.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WaterCorn {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @Column
    private String slug;

    @Column
    private Long price;

    @Column
    private String description;

    @Column
    private String image;
}
