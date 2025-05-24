package org.example.backend.service;

import org.example.backend.model.VehicleImage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public VehicleImage storeFile(MultipartFile file, String directory) throws IOException {
        Path directoryPath = Paths.get(uploadDir, directory);
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }

        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = UUID.randomUUID() + fileExtension;

        Path targetPath = directoryPath.resolve(fileName);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(directory)
                .path("/")
                .path(fileName)
                .toUriString();

        VehicleImage vehicleImage = new VehicleImage();
        vehicleImage.setFileName(fileName);
        vehicleImage.setFileType(file.getContentType());
        vehicleImage.setFilePath(targetPath.toString());
        vehicleImage.setFileUrl(fileUrl);

        return vehicleImage;
    }

    @Override
    public void deleteFile(String filePath) throws IOException {
        if (filePath == null || filePath.isEmpty()) {
            return;
        }
        Path path = Paths.get(filePath);
        if (Files.exists(path)) {
            Files.delete(path);
        }
    }

    @Override
    public Path getFilePath(String fileName, String directory) {
        return Paths.get(uploadDir, directory, fileName);
    }
}
