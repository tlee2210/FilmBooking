package com.cinemas.service.impl.home;

import com.cinemas.entities.WaterCorn;
import com.cinemas.repositories.WaterCornRepository;
import com.cinemas.service.home.HomeWatercornService;
import com.cinemas.service.impl.FileStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class HomeWatercornServiceImpl implements HomeWatercornService {
    @Autowired
    WaterCornRepository waterCornRepository;

    @Autowired
    FileStorageServiceImpl fileStorageServiceImpl;

    @Override
    public List<WaterCorn> getWatercorn() {
        List<WaterCorn> waterCorns = waterCornRepository.findAll();
        waterCorns.forEach(item -> {
            item.setImage(fileStorageServiceImpl.getUrlFromPublicId(item.getImage()));
        });

        return waterCorns;
    }
}
