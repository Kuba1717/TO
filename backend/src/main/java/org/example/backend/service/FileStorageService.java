package org.example.backend.service;

import org.example.backend.model.VehicleImage;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Path;

public interface FileStorageService {
    VehicleImage storeFile(MultipartFile file, String directory) throws IOException;
    void deleteFile(String filePath) throws IOException;
    Path getFilePath(String fileName, String directory);
}
