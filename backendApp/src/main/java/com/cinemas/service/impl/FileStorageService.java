package com.cinemas.service.impl;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) throws IOException {

        return cloudinary.uploader().upload(file.getBytes(), Map.of("public", UUID.randomUUID().toString()))
                .get("url").toString();
    }

}
