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
public class VoucherTasks {
    @Autowired
    private VoucherRepository voucherRepository;

    @Scheduled(cron = "*/10 * * * * *")
    public void checkVoucher() {
        List<Voucher> vouchers = voucherRepository.findAll();
        vouchers.forEach(voucher -> {
            if (voucher.getStatusVoucher() != StatusVoucher.USEDUP) {
                if (voucher.getExpirationDate().isBefore(LocalDate.now())) {
                    if (voucher.getStatusVoucher() != StatusVoucher.EXPIRED) {
                        voucher.setStatusVoucher(StatusVoucher.EXPIRED);
                        voucherRepository.save(voucher);
                    }
                } else {
                    if (voucher.getStatusVoucher() != StatusVoucher.ACTIVE) {
                        voucher.setStatusVoucher(StatusVoucher.ACTIVE);
                        voucherRepository.save(voucher);
                    }
                }
            }
        });
    }
}
