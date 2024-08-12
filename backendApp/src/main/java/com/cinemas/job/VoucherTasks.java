package com.cinemas.job;

import com.cinemas.entities.Voucher;
import com.cinemas.enums.StatusVoucher;
import com.cinemas.repositories.VoucherRepository;

@Component
public class VoucherTasks {
      @Autowired
    private VoucherRepository voucherRepository;

   @Scheduled(cron = "*/10 * * * * *")
    public void checkVoucher() {
       List<Voucher> vouchersActive = voucherRepository.findByExpirationDateBefore(StatusVoucher.ACTIVE);
       vouchersActive.forech

   }
}
