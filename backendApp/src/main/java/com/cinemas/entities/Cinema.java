package com.cinemas.entities;

import com.cinemas.enums.StatusCinema;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cinema")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String slug;

    @Column
    private String address;

    @Column
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String city;

    @Column
    private String lat;

    @Column
    private String lng;

    @Column
    private StatusCinema status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cinema", cascade = CascadeType.ALL)
    private List<CinemaImages> images;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cinema", cascade = CascadeType.ALL)
    private List<Room> Rooms;

    @JsonIgnore
    @OneToMany(mappedBy = "cinema", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Showtimes> showtimes = new ArrayList<>();
}
