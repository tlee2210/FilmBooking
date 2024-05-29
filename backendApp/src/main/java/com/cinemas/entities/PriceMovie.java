package com.cinemas.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "price_movie")
public class PriceMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Float price;

    @ManyToOne()
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    Movie movie;

    public PriceMovie(Date date, Float price) {
        this.date = date;
        this.price = price;
    }
}
