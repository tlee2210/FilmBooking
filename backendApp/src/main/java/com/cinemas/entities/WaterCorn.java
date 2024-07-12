package com.cinemas.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WaterCorn {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @Column
    private String slug;

    @Column
    private Long price;

    @Column
    private String description;

    @Column
    private String image;

    @OneToMany(mappedBy = "waterCorn", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingWaterCorn> bookingWaterCorn;
}
