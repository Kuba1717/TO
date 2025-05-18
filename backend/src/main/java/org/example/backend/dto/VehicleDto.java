package org.example.backend.dto;

import lombok.Data;
import org.example.backend.model.VehicleImage;

import java.util.ArrayList;
import java.util.List;

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
    private List<VehicleImageDto> images = new ArrayList<>();
    private Long modelId;
    private Long typeId;
}
