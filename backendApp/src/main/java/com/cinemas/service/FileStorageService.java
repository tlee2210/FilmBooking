package com.cinemas.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface FileStorageService {
    String uploadFile(MultipartFile file, String folderName) throws IOException;

    String getUrlFromPublicId(String publicId);

    //    void deleteFile(String publicId, String resourceType);
    Map<String, Object> deleteFile(String publicId) throws IOException;
    Map<String, Object> deleteVideo(String publicId, String resourceType) throws IOException;
}
