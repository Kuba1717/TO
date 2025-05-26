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
    private String condition2; //co to k jest???

    @Column(name = "power")
    private int power;

    @Column(name = "mileage")
    private int mileage;


    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VehicleImage> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "modelId")
    private Model model;

    @ManyToOne
    @JoinColumn(name = "typeId")
    private Type type;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Announcement> announcements = new ArrayList<>();

    public void addImage(VehicleImage image) {
        images.add(image);
        image.setVehicle(this);
    }

    public void removeImage(VehicleImage image) {
        images.remove(image);
        image.setVehicle(null);
    }

}
