package org.example.backend.service;

import org.example.backend.dto.VehicleDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VehicleService {
    List<VehicleDto> getAllVehicle();
    VehicleDto getVehicleById(Long id);
    VehicleDto createVehicle(VehicleDto vehicleDto);
    VehicleDto updateVehicle(Long id, VehicleDto vehicleDto);
    void deleteVehicle(Long id);
    VehicleDto addImageToVehicle(Long id, MultipartFile file) throws IOException;
    VehicleDto removeImageFromVehicle(Long vehicleId, Long imageId) throws IOException;
}
