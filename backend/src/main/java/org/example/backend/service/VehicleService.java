package org.example.backend.service;

import org.example.backend.dto.TypeDto;
import org.example.backend.dto.VehicleDto;

import java.util.List;

public interface VehicleService {
    List<VehicleDto> getAllVehicle();
    VehicleDto getVehicleById(Long id);
    VehicleDto createVehicle(VehicleDto vehicleDto);
    VehicleDto updateVehicle(Long id, VehicleDto vehicleDto);
    void deleteVehicle(Long id);
}
