package com.cinemas.job;

import com.cinemas.entities.Voucher;
import com.cinemas.enums.StatusVoucher;
import com.cinemas.repositories.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ScheduledTasks {
    @Autowired
    private VoucherRepository voucherRepository;

    @Scheduled(cron = "0 0 0 * * *")
//    @Scheduled(cron = "*/30 * * * * *")
    public void reportCurrentTime() {
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void removeExpiredVoucher(){
        LocalDate today = LocalDate.now();
        List<Voucher> expiredVouchers = voucherRepository.findByExpirationDateBefore(today);

        for (Voucher voucher : expiredVouchers) {
            voucher.setStatusVoucher(StatusVoucher.EXPIRED);
            voucherRepository.save(voucher);
        }
    }
}
