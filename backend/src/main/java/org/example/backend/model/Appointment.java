package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "status")
    private String status;
/*    @DateTimeFormat(pattern = "MM/dd/yyyy hh:mm a", iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy hh:mm a")*/
    @Column(name = "appointmentDate")
    private LocalDateTime appointmentDate;
    @ManyToOne
    @JoinColumn(name = "announcementId")
    private Announcement announcement;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
