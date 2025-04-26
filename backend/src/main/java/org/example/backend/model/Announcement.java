package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "announcement")
public class Announcement {

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
    @Column(name = "placedDate")
    private LocalDateTime placedDate;
    @Column(name = "location")
    private String location;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private Double price;
    @ManyToOne
    @JoinColumn(name = "vehicleId")
    private Vehicle vehicle;
    @OneToMany(mappedBy = "announcement", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<>();

}
