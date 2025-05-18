package org.example.backend.dto;

import lombok.Data;

@Data
public class VehicleImageDto {
    private Long id;
    private String fileName;
    private String fileType;
    private String filePath;
    private String fileUrl;
    private Long vehicleId;
}

