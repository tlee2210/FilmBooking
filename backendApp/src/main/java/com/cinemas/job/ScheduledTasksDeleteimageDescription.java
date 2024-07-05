package com.cinemas.job;

import com.cinemas.entities.imageDescription;
import com.cinemas.repositories.imageDescriptionRespository;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ScheduledTasksDeleteimageDescription {
    @Autowired
    imageDescriptionRespository imageDescriptionRespository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

//    @Scheduled(cron = "*/30 * * * * *")
    @Scheduled(cron = "0 0 0 * * *")
    public void DeleteimageDescription(){
        List<imageDescription> imageDescriptionList = imageDescriptionRespository.findBySlug_nameNull();
        imageDescriptionList.forEach(item -> {
            try {
                fileStorageServiceImpl.deleteFile(item.getUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        imageDescriptionRespository.deleteAll(imageDescriptionList);
    }
}
