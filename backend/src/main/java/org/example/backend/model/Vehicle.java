package org.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "productionYear")
    private int productionYear;
    @Column(name = "registrationNumber")
    private String registrationNumber;
    @Column(name = "colour")
    private String colour;
    @Column(name = "vin")
    private String vin;
    @Column(name = "fuelType")
    private String fuelType;
    @Column(name = "engineCapacity")
    private int engineCapacity;
    @Column(name = "condition2")
    private String condition2;
    @Column(name = "power")
    private int power;
    @Column(name = "mileage")
    private int mileage;
    /*@Column(name = "photo")
    private int photo;*/

    @ManyToOne
    @JoinColumn(name = "modelId")
    private Model model;
    @ManyToOne
    @JoinColumn(name = "typeId")
    private Type type;
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Announcement> announcements = new ArrayList<>();

}
