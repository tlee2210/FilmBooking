package com.cinemas.service.impl.admin;

import com.cinemas.service.admin.UploadFileService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UploadFileServiceImpl implements UploadFileService {
    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public String UploadFile(MultipartFile file, String folder) throws IOException {
        String key = fileStorageServiceImpl.uploadFile(file, folder);
        return fileStorageServiceImpl.getUrlFromPublicId(key);
    }
}
