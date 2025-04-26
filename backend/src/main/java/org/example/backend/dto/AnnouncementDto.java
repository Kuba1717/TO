package org.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnnouncementDto {
    private Long id;
    private String name;
    private String status;
/*    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy hh:mm a")*/
    private LocalDateTime placedDate;
    private String location;
    private String description;
    private Double price;
    private Long vehicleId;
}
