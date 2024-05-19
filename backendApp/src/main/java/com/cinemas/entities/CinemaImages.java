package com.cinemas.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cinema_images")
public class CinemaImages {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @Column()
    private String url;

//    @Transient
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "cinema_id", referencedColumnName = "id")
    Cinema cinema;

//    @Column(name = "cinemaId")
//    @JsonIgnore
//    private Integer cinemaId;
}
