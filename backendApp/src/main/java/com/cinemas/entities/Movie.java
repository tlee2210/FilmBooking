package com.cinemas.entities;

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
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int duration;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String producer;

    @Column(nullable = false)
    private String movieContent;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String trailer;

    @Column(nullable = false)
    private String rules;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false, unique = true)
    private String slug;

    @ManyToMany
    @JoinTable(
            name = "movie_moviegenre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<MovieGenre> genres;

    @ManyToMany
    @JoinTable(
            name = "movie_celebrity",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "celebrity_id")
    )
    private List<Celebrity> celebrities;

    @ManyToMany
    @JoinTable(
            name = "cinema_movie",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "cinema_id")
    )
    private List<Cinema> cinemas;

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Column
    private LocalDate endDate;
}