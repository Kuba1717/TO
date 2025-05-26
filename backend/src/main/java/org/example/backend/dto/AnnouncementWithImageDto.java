package org.example.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AnnouncementWithImageDto {
    private Long id;
    private String name;
    private String location;
    private String description;
    private Double price;
    private LocalDateTime placedDate;
    private List<String> imageUrls;
    private VehicleDto vehicle;
}

