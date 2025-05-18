package org.example.backend.service;

import org.example.backend.dto.VehicleDto;
import org.example.backend.mapper.VehicleMapper;
import org.example.backend.model.Model;
import org.example.backend.model.Type;
import org.example.backend.model.Vehicle;
import org.example.backend.model.VehicleImage;
import org.example.backend.repository.ModelRepository;
import org.example.backend.repository.TypeRepository;
import org.example.backend.repository.VehicleImageRepository;
import org.example.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleServiceImpl implements VehicleService{

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;
    private final FileStorageService fileStorageService;
    private final VehicleImageRepository vehicleImageRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository, VehicleMapper vehicleMapper, FileStorageService fileStorageService, VehicleImageRepository vehicleImageRepository) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleMapper = vehicleMapper;
        this.fileStorageService = fileStorageService;
        this.vehicleImageRepository = vehicleImageRepository;
    }

    @Override
    public List<VehicleDto> getAllVehicle() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        List<VehicleDto> vehicleDtos = new ArrayList<>();
        for (Vehicle vehicle : vehicles) {
            vehicleDtos.add(vehicleMapper.toDto(vehicle));
        }
        return vehicleDtos;
    }
    @Override
    public VehicleDto getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        return vehicleMapper.toDto(vehicle);
    }
    @Override
    public VehicleDto createVehicle(VehicleDto vehicleDto) {
        if (vehicleDto.getId() != null && vehicleRepository.existsById(vehicleDto.getId())) {
            return null;
        }
        Vehicle vehicle = vehicleMapper.toEntity(vehicleDto);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return vehicleMapper.toDto(savedVehicle);
    }


    @Override
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

    @Override
    public VehicleDto addImageToVehicle(Long id, MultipartFile file) throws IOException {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        if (vehicle == null) {
            return null;
        }

        VehicleImage vehicleImage = fileStorageService.storeFile(file, "vehicles");
        vehicleImage.setVehicle(vehicle);
        vehicle.addImage(vehicleImage);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);
        return vehicleMapper.toDto(updatedVehicle);
    }

    @Override
    public VehicleDto removeImageFromVehicle(Long vehicleId, Long imageId) throws IOException {
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElse(null);
        if (vehicle == null) {
            return null;
        }

        Optional<VehicleImage> imageOpt = vehicle.getImages().stream()
                .filter(img -> img.getId().equals(imageId))
                .findFirst();

        if (imageOpt.isPresent()) {
            VehicleImage image = imageOpt.get();
            vehicle.removeImage(image);
            fileStorageService.deleteFile(image.getFilePath());
            vehicleImageRepository.deleteById(imageId);

            Vehicle updatedVehicle = vehicleRepository.save(vehicle);
            return vehicleMapper.toDto(updatedVehicle);
        }

        return vehicleMapper.toDto(vehicle);
    }
}