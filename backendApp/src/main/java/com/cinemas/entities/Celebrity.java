package com.cinemas.entities;

import com.cinemas.enums.RoleCeleb;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Celebrity {
    @Id
    @GeneratedValue
    private int id;

    @Column
    private String name;

    @Column
    private LocalDate dateOfBirth;

//    @Column
//    private String nationality;

    @Column
    private String biography;

    @Column
    private String description;

    @Column
    private RoleCeleb role;

    @Column
    private String image;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
}
