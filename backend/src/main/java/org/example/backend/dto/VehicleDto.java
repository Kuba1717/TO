package org.example.backend.dto;

import lombok.Data;

@Data
public class VehicleDto {

    private Long id;
    private int productionYear;
    private String registrationNumber;
    private String colour;
    private String vin;
    private String fuelType;
    private int engineCapacity;
    private String condition;
    private int power;
    private int mileage;
    //private String photo;
    private Long modelId;
    private Long typeId;
}
