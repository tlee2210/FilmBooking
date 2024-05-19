package com.cinemas.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cinema_images")
@JsonIgnoreProperties({"cinema"})
public class CinemaImages {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @Column()
    private String url;

    @ManyToOne
//    @JsonIgnore
    @JoinColumn(name = "cinema_id", referencedColumnName = "id")
    Cinema cinema;

}
