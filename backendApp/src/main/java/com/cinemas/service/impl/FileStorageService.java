package com.cinemas.service.impl;

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
public class FileStorageService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, String folderName) throws IOException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String timestamp = LocalDateTime.now().format(formatter);

        String fullFileName = file.getName() + "_" + timestamp;

        Map<String, Object> uploadParams = Map.of(
                "public_id", fullFileName,
                "folder", folderName
        );

        cloudinary.uploader().upload(file.getBytes(), uploadParams)
                .get("url").toString();
        return folderName + "/" + fullFileName;
    }

    public String getUrlFromPublicId(String publicId) {
        String url = cloudinary.url().publicId(publicId).generate();
        return url;
    }

    public Map<String, Object> deleteFile(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
