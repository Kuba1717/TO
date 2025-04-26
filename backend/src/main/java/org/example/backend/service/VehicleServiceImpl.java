package org.example.backend.service;

import org.example.backend.dto.VehicleDto;
import org.example.backend.mapper.VehicleMapper;
import org.example.backend.model.Model;
import org.example.backend.model.Type;
import org.example.backend.model.Vehicle;
import org.example.backend.repository.ModelRepository;
import org.example.backend.repository.TypeRepository;
import org.example.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService{

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleMapper vehicleMapper;

    public List<VehicleDto> getAllVehicle() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        List<VehicleDto> vehicleDtos = new ArrayList<>();
        for (Vehicle vehicle : vehicles) {
            vehicleDtos.add(vehicleMapper.toDto(vehicle));
        }
        return vehicleDtos;
    }

    public VehicleDto getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        return vehicleMapper.toDto(vehicle);
    }

    public VehicleDto createVehicle(VehicleDto vehicleDto) {
        if (vehicleDto.getId() != null && vehicleRepository.existsById(vehicleDto.getId())) {
            return null;
        }
        Vehicle vehicle = vehicleMapper.toEntity(vehicleDto);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return vehicleMapper.toDto(savedVehicle);
    }



    public VehicleDto updateVehicle(Long id, VehicleDto vehicleDto) {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        if (vehicle == null) {
            return null;
        }
        Vehicle updatedVehicle = vehicleRepository.save(vehicle);
        return vehicleMapper.toDto(updatedVehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}