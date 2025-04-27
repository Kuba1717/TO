package org.example.backend.mapper;

import org.example.backend.dto.AnnouncementDto;
import org.example.backend.dto.AppointmentDto;
import org.example.backend.model.Announcement;
import org.example.backend.model.Appointment;
import org.example.backend.model.User;
import org.example.backend.model.Vehicle;
import org.example.backend.repository.AnnouncementRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.repository.VehicleRepository;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {
    private final UserRepository userRepository;
    private final AnnouncementRepository announcementRepository;
    public AppointmentMapper(UserRepository userRepository, AnnouncementRepository announcementRepository)
    {
        this.userRepository = userRepository;
        this.announcementRepository = announcementRepository;
    }

    public AppointmentDto toDto(Appointment appointment) {
        if (appointment == null) {
            return null;
        }
        AppointmentDto dto = new AppointmentDto();
        dto.setId(appointment.getId());
        dto.setName(appointment.getName());
        dto.setStatus(appointment.getStatus());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        if (appointment.getUser() != null) {
            dto.setUserId(appointment.getUser().getId());
        } else {
            dto.setUserId(null);
        }
        if (appointment.getAnnouncement() != null) {
            dto.setAnnouncementId(appointment.getAnnouncement().getId());
        } else {
            dto.setAnnouncementId(null);
        }

        return dto;
    }

    public Appointment toEntity(AppointmentDto dto) {
        if (dto == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        appointment.setName(dto.getName());
        appointment.setStatus(dto.getStatus());
        appointment.setAppointmentDate(dto.getAppointmentDate());
        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId()).orElse(null);
            if (user != null) {
                appointment.setUser(user);
            }
        }
        if (dto.getAnnouncementId() != null) {
            Announcement announcement = announcementRepository.findById(dto.getAnnouncementId()).orElse(null);
            if (announcement != null) {
                appointment.setAnnouncement(announcement);
            }
        }
        return appointment;
    }

    public void updateEntity(Appointment appointment, AppointmentDto dto) {
        if (dto == null || appointment == null) {
            return;
        }
        dto.setName(appointment.getName());
        dto.setStatus(appointment.getStatus());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        if (appointment.getUser() != null) {
            dto.setUserId(appointment.getUser().getId());
        } else {
            dto.setUserId(null);
        }
        if (appointment.getAnnouncement() != null) {
            dto.setAnnouncementId(appointment.getAnnouncement().getId());
        } else {
            dto.setAnnouncementId(null);
        }
    }
}
