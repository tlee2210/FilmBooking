package com.cinemas.service.admin;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadFileService {
    String UploadFile(MultipartFile file, String folder) throws IOException;
}
