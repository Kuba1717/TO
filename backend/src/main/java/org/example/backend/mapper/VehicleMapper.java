package org.example.backend.mapper;

import org.example.backend.dto.VehicleDto;
import org.example.backend.dto.VehicleImageDto;
import org.example.backend.model.Model;
import org.example.backend.model.Type;
import org.example.backend.model.Vehicle;
import org.example.backend.model.VehicleImage;
import org.example.backend.repository.MarkRepository;
import org.example.backend.repository.ModelRepository;
import org.example.backend.repository.TypeRepository;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class VehicleMapper {

    private final ModelRepository modelRepository;
    private final TypeRepository typeRepository;


    public VehicleMapper(ModelRepository modelRepository, TypeRepository typeRepository)
    {
        this.modelRepository = modelRepository;
        this.typeRepository = typeRepository;
    }

    public VehicleDto toDto(Vehicle vehicle) {
        if (vehicle == null) {
            return null;
        }
        VehicleDto dto = new VehicleDto();
        dto.setId(vehicle.getId());
        dto.setProductionYear(vehicle.getProductionYear());
        dto.setRegistrationNumber(vehicle.getRegistrationNumber());
        dto.setColour(vehicle.getColour());
        dto.setVin(vehicle.getVin());
        dto.setFuelType(vehicle.getFuelType());
        dto.setEngineCapacity(vehicle.getEngineCapacity());
        dto.setCondition(vehicle.getCondition2());
        dto.setPower(vehicle.getPower());
        dto.setMileage(vehicle.getMileage());
        if (vehicle.getImages() != null) {
            dto.setImages(vehicle.getImages().stream()
                    .map(this::mapImageToDto)
                    .toList());
        }

        if (vehicle.getModel() != null) {
            dto.setModelId(vehicle.getModel().getId());
        } else {
            dto.setModelId(null);
        }
        if (vehicle.getType() != null) {
            dto.setTypeId(vehicle.getType().getId());
        } else {
            dto.setTypeId(null);
        }
        return dto;
    }

    public Vehicle toEntity(VehicleDto dto) {
        if (dto == null) {
            return null;
        }
        Vehicle vehicle = new Vehicle();
        vehicle.setProductionYear(dto.getProductionYear());
        vehicle.setRegistrationNumber(dto.getRegistrationNumber());
        vehicle.setColour(dto.getColour());
        vehicle.setVin(dto.getVin());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setEngineCapacity(dto.getEngineCapacity());
        vehicle.setCondition2(dto.getCondition());
        vehicle.setPower(dto.getPower());
        vehicle.setMileage(dto.getMileage());

        if (dto.getModelId() != null) {
            Model model = modelRepository.findById(dto.getModelId()).orElse(null);
            if (model != null) {
                vehicle.setModel(model);
            }
        }
        if (dto.getTypeId() != null) {
            Type type = typeRepository.findById(dto.getTypeId()).orElse(null);
            if (type != null) {
                vehicle.setType(type);
            }
        }
        return vehicle;
    }

    public void updateEntity(Vehicle vehicle, VehicleDto dto) {
        if (dto == null || vehicle == null) {
            return;
        }
        vehicle.setProductionYear(dto.getProductionYear());
        vehicle.setRegistrationNumber(dto.getRegistrationNumber());
        vehicle.setColour(dto.getColour());
        vehicle.setVin(dto.getVin());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setEngineCapacity(dto.getEngineCapacity());
        vehicle.setCondition2(dto.getCondition());
        vehicle.setPower(dto.getPower());
        vehicle.setMileage(dto.getMileage());
        if (dto.getModelId() != null) {
            Model model = modelRepository.findById(dto.getModelId()).orElse(null);
            if (model != null) {
                vehicle.setModel(model);
            }
        }
        if (dto.getTypeId() != null) {
            Type type = typeRepository.findById(dto.getTypeId()).orElse(null);
            if (type != null) {
                vehicle.setType(type);
            }
        }



    }

    private VehicleImageDto mapImageToDto(VehicleImage image) {
        if (image == null) {
            return null;
        }
        VehicleImageDto dto = new VehicleImageDto();
        dto.setId(image.getId());
        dto.setFileName(image.getFileName());
        dto.setFileType(image.getFileType());
        dto.setFilePath(image.getFilePath());
        dto.setFileUrl(image.getFileUrl());

        if (image.getVehicle() != null) {
            dto.setVehicleId(image.getVehicle().getId());
        }
        return dto;
    }
}
