package com.cinemas.service.impl;

import com.cinemas.service.FileStorageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, String folderName) throws IOException {

        String resourceType;
        String contentType = file.getContentType();
        if (contentType == null) {
            throw new IllegalArgumentException("File content type cannot be null");
        }
        if (contentType.startsWith("image/")) {
            resourceType = "image";
        } else if (contentType.startsWith("video/")) {
            resourceType = "video";
        } else {
            throw new IllegalArgumentException("File must be an image or a video");
        }

        String uuid = UUID.randomUUID().toString();
        String fullFileName = file.getOriginalFilename() + "_" + uuid;

        Map<String, Object> uploadParams = Map.of(
                "public_id", fullFileName,
                "folder", folderName,
                "resource_type", resourceType
        );

        // Upload the file to Cloudinary
        Map uploadResult = cloudinary.uploader().uploadLarge(file.getBytes(), uploadParams);

        return (String) uploadResult.get("url");
    }

    public String getUrlFromPublicId(String publicId) {
        String url = cloudinary.url().publicId(publicId).generate();

        return url;
    }

    public Map<String, Object> deleteFile(String publicId) throws IOException {

        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
