package org.example.backend.service;

import org.example.backend.dto.AnnouncementDto;
import org.example.backend.mapper.AnnouncementMapper;
import org.example.backend.model.Announcement;
import org.example.backend.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnnouncementServiceImpl implements AnnouncementService{

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private AnnouncementMapper announcementMapper;

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
}
