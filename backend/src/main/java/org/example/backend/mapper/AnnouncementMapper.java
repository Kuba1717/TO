package org.example.backend.mapper;

import org.example.backend.dto.AnnouncementDto;
import org.example.backend.model.Announcement;
import org.example.backend.model.Vehicle;
import org.example.backend.repository.VehicleRepository;
import org.springframework.stereotype.Component;


@Component
public class AnnouncementMapper {
    private final VehicleRepository vehicleRepository;
    public AnnouncementMapper(VehicleRepository vehicleRepository) {this.vehicleRepository = vehicleRepository;}

    public AnnouncementDto toDto(Announcement announcement) {
        if (announcement == null) {
            return null;
        }
        AnnouncementDto dto = new AnnouncementDto();
        dto.setId(announcement.getId());
        dto.setName(announcement.getName());
        dto.setStatus(announcement.getStatus());
        dto.setPlacedDate(announcement.getPlacedDate());
        dto.setLocation(announcement.getLocation());
        dto.setDescription(announcement.getDescription());
        if (announcement.getVehicle() != null) {
            dto.setVehicleId(announcement.getVehicle().getId());
        } else {
            dto.setVehicleId(null);
        }
        return dto;
    }

    public Announcement toEntity(AnnouncementDto dto) {
        if (dto == null) {
            return null;
        }
        Announcement announcement = new Announcement();
        announcement.setName(dto.getName());
        announcement.setStatus(dto.getStatus());
        announcement.setPlacedDate(dto.getPlacedDate());
        announcement.setLocation(dto.getLocation());
        announcement.setDescription(dto.getDescription());
        announcement.setPrice(dto.getPrice());
        if (dto.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId()).orElse(null);
            if (vehicle != null) {
                announcement.setVehicle(vehicle);
            }
        }
        return announcement;
    }

    public void updateEntity(Announcement announcement, AnnouncementDto dto) {
        if (dto == null || announcement == null) {
            return;
        }
        dto.setName(announcement.getName());
        dto.setStatus(announcement.getStatus());
        dto.setPlacedDate(announcement.getPlacedDate());
        dto.setLocation(announcement.getLocation());
        dto.setDescription(announcement.getDescription());
        if (dto.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId()).orElse(null);
            if (vehicle != null) {
                announcement.setVehicle(vehicle);
            }
        }
    }
}