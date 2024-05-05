package com.cinemas.entities;

import com.cinemas.enums.RoleCeleb;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Celebrity {
    @Id
    @GeneratedValue
    private int id;

    @Column
    private String name;

    @Column
    private LocalDate dateOfBirth;

    @Column
    private String nationality;

    @Column
    private String biography;

    @Column
    private String description;

    @Column
    private RoleCeleb role;

    @Column
    private String image;
}
