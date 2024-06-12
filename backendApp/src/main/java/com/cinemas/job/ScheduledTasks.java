package com.cinemas.job;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    @Scheduled(cron = "0 0 0 * * *")
    public void reportCurrentTime() {
    }
}
