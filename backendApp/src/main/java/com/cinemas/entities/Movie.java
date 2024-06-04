package com.cinemas.entities;

import com.cinemas.enums.MovieStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
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
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private Integer duration_movie;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String producer;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String imageLandscape;

    @Column(nullable = false)
    private String imagePortrait;

    @Column(nullable = false)
    private String trailer;

    @Column(nullable = false)
    private String rules;

    @Column(nullable = false)
    private String movieFormat;

    @Column(nullable = false)
    private Float price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MovieStatus status;

    @ManyToMany
    @JoinTable(
            name = "movie_moviegenre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<MovieGenre> categories;

    @ManyToMany
    @JoinTable(
            name = "movie_actor",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "celebrity_id")
    )
    private List<Celebrity> actor;

    @ManyToMany
    @JoinTable(
            name = "movie_director",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "celebrity_id")
    )
    private List<Celebrity> director;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PriceMovie> priceMovies = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Showtimes> showtimes = new ArrayList<>();

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Column
    private LocalDate endDate;
}
