package com.cinemas.service.impl;

import com.cinemas.service.FileStorageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.Executors;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.CompletableFuture;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    private final Cloudinary cloudinary;

    private final ExecutorService executorService = Executors.newFixedThreadPool(10);

    public CompletableFuture<String> uploadFileAsync(MultipartFile file, String folderName) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return uploadFile(file, folderName);
            } catch (IOException e) {
                throw new RuntimeException("Error uploading file to Cloudinary", e);
            }
        }, executorService);
    }

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
        String fullFileName = uuid;

        Map<String, Object> uploadParams = Map.of("public_id", fullFileName, "folder", folderName, "resource_type", resourceType);

        cloudinary.uploader().uploadLarge(file.getBytes(), uploadParams);

        return folderName + "/" + fullFileName;
    }

    public List<CompletableFuture<String>> uploadFilesAsync(List<MultipartFile> files, String folderName) {
        return files.stream().map(file -> uploadFileAsync(file, folderName)).collect(Collectors.toList());
    }

    public List<String> uploadFilesAndWait(List<MultipartFile> files, String folderName) {
        List<CompletableFuture<String>> futures = uploadFilesAsync(files, folderName);
        return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
    }

    public String getUrlFromPublicId(String publicId) {
        String url = cloudinary.url().publicId(publicId).generate();
        return url;
    }

    public Map<String, Object> deleteFile(String publicId) throws IOException {

        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    public Map<String, Object> deleteVideo(String publicId, String resourceType) throws IOException {
        Map<String, Object> deleteParams = ObjectUtils.asMap("resource_type", resourceType);
        return cloudinary.uploader().destroy(publicId, deleteParams);
    }
//    public void deleteFile(String publicId, String resourceType) {
//        try {
//            Map<String, String> params = ObjectUtils.asMap(
//                    "resource_type", resourceType
//            );
//            cloudinary.uploader().destroy(publicId, params);
//        } catch (IOException e) {
//            throw new RuntimeException("Error deleting file from Cloudinary", e);
//        }
//    }
}
