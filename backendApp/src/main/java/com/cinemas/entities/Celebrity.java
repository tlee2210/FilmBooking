package com.cinemas.entities;

import com.cinemas.enums.RoleCeleb;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Celebrity {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @Column
    private LocalDate dateOfBirth;

    @Column
    private String slug;
    @Column
    private Integer view = 0;

    @Column(columnDefinition = "TEXT")
    private String biography;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private RoleCeleb role;

    @Column
    private String image;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToMany(mappedBy = "actor")
    @JsonIgnore
    private List<Movie> moviesActor;

    @ManyToMany(mappedBy = "director")
    @JsonIgnore
    private List<Movie> moviesDirector;
}
