package org.example.backend.service;

import org.example.backend.dto.AnnouncementDto;
import org.example.backend.dto.AnnouncementWithImageDto;
import org.example.backend.dto.VehicleDto;
import org.example.backend.mapper.AnnouncementMapper;
import org.example.backend.mapper.VehicleMapper;
import org.example.backend.model.Announcement;
import org.example.backend.model.Vehicle;
import org.example.backend.model.VehicleImage;
import org.example.backend.repository.AnnouncementRepository;
import org.example.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnnouncementServiceImpl implements AnnouncementService{

    @Autowired
    private AnnouncementRepository announcementRepository;
    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private AnnouncementMapper announcementMapper;
    @Autowired
    private VehicleMapper vehicleMapper;

    public List<AnnouncementDto> getAllAnnouncements() {
        List<Announcement> announcements = announcementRepository.findAll();
        List<AnnouncementDto> announcementDtos = new ArrayList<>();
        for (Announcement announcement : announcements) {
            announcementDtos.add(announcementMapper.toDto(announcement));
        }
        return announcementDtos;
    }

    public AnnouncementDto getAnnouncementById(Long id) {
        Announcement announcement = announcementRepository.findById(id).orElse(null);
        return announcementMapper.toDto(announcement);
    }

    public AnnouncementDto createAnnouncement(AnnouncementDto announcementDto) {
        if (announcementDto.getId() != null && announcementRepository.existsById(announcementDto.getId())) {
            return null;
        }
        Announcement announcement = announcementMapper.toEntity(announcementDto);
        Announcement savedAnnouncement = announcementRepository.save(announcement);
        return announcementMapper.toDto(savedAnnouncement);
    }

    public AnnouncementDto updateAnnouncement(Long id, AnnouncementDto announcementDto) {
        Announcement announcement = announcementRepository.findById(id).orElse(null);
        if (announcement == null) {
            return null;
        }
        Announcement updatedAnnouncement = announcementRepository.save(announcement);
        return announcementMapper.toDto(updatedAnnouncement);
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }

    public List<AnnouncementWithImageDto> getAnnouncementsWithImages() {
        List<Announcement> announcements = announcementRepository.findAll();

        return announcements.stream().map(announcement -> {
            AnnouncementWithImageDto dto = new AnnouncementWithImageDto();
            dto.setId(announcement.getId());
            dto.setName(announcement.getName());
            dto.setLocation(announcement.getLocation());
            dto.setDescription(announcement.getDescription());
            dto.setPrice(announcement.getPrice());
            dto.setPlacedDate(announcement.getPlacedDate());

            List<String> imageUrls = new ArrayList<>();
            if (announcement.getVehicle() != null &&
                    announcement.getVehicle().getImages() != null) {
                imageUrls = announcement.getVehicle().getImages()
                        .stream()
                        .map(VehicleImage::getFileUrl)
                        .toList();
            }
            dto.setImageUrls(imageUrls);
            Vehicle vehicle = announcement.getVehicle();
            if (vehicle != null) {
                VehicleDto vehicleDto = vehicleMapper.toDto(vehicle);
                dto.setVehicle(vehicleDto);
            }

            return dto;
        }).toList();
    }


    public AnnouncementWithImageDto getAnnouncementWithImagesById(Long id) {
        Announcement announcement = announcementRepository.findById(id).orElse(null);
        if (announcement == null) return null;

        AnnouncementWithImageDto dto = new AnnouncementWithImageDto();
        dto.setId(announcement.getId());
        dto.setName(announcement.getName());
        dto.setLocation(announcement.getLocation());
        dto.setDescription(announcement.getDescription());
        dto.setPrice(announcement.getPrice());
        dto.setPlacedDate(announcement.getPlacedDate());

        List<String> imageUrls = new ArrayList<>();
        if (announcement.getVehicle() != null &&
                announcement.getVehicle().getImages() != null) {
            imageUrls = announcement.getVehicle().getImages()
                    .stream()
                    .map(VehicleImage::getFileUrl)
                    .toList();
        }
        dto.setImageUrls(imageUrls);
        Vehicle vehicle = announcement.getVehicle();
        if (vehicle != null) {
            VehicleDto vehicleDto = vehicleMapper.toDto(vehicle);
            dto.setVehicle(vehicleDto);
        }

        return dto;
    }

}
