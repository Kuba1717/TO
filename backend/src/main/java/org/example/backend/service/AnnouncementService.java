package org.example.backend.service;

import org.example.backend.dto.AnnouncementDto;
import org.example.backend.dto.AnnouncementWithImageDto;

import java.util.List;

public interface AnnouncementService {
    List<AnnouncementDto> getAllAnnouncements();
    AnnouncementDto getAnnouncementById(Long id);
    AnnouncementDto createAnnouncement(AnnouncementDto announcementDto);
    AnnouncementDto updateAnnouncement(Long id, AnnouncementDto announcementDto);
    void deleteAnnouncement(Long id);
    List<AnnouncementWithImageDto> getAnnouncementsWithImages();
    AnnouncementWithImageDto getAnnouncementWithImagesById(Long id);

}
