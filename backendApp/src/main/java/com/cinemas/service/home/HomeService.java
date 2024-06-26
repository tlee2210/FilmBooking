package com.cinemas.service.home;

import com.cinemas.dto.response.HomeResponse;

public interface HomeService {
    HomeResponse getHomeInfo();
    HomeResponse getNavbarInfo();
}
