package org.example.backend.service;

import org.example.backend.dto.AppointmentDto;

import java.util.List;

public interface AppointmentService {
    List<AppointmentDto> getAllAppointments();
    AppointmentDto getAppointmentById(Long id);
    AppointmentDto createAppointment(AppointmentDto appointmentDto);
    AppointmentDto updateAppointment(Long id, AppointmentDto appointmentDto);
    void deleteAppointment(Long id);
}
