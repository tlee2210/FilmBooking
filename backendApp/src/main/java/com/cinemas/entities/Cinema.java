package com.cinemas.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cinema")
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(unique = true, nullable = false)
    private Integer id;

    @Column
    private String name;

    @Column
    private String slug;

    @Column
    private String address;

    @Column
    private String phone;

    @Column
//    @Size(min = 10, max = 255, message = "Max 255")
    private String description;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cinema", cascade = CascadeType.ALL)
//    @JoinColumn(name = "cinemaId")
    private List<CinemaImages> images;
}
