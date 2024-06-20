package com.cinemas.service.impl.admin;

import com.cinemas.entities.imageDescription;
import com.cinemas.repositories.imageDescriptionRespository;
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
    @Autowired
    imageDescriptionRespository descriptionRespository;

    @Override
    public String UploadFile(MultipartFile file, String folder) throws IOException {
        imageDescription imageDescription = new imageDescription();
        imageDescription.setUrl(fileStorageServiceImpl.uploadFile(file, folder));
        descriptionRespository.save(imageDescription);

        return fileStorageServiceImpl.getUrlFromPublicId(imageDescription.getUrl());
    }
}
