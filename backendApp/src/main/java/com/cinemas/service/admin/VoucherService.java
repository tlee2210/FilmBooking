package com.cinemas.service.admin;

import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.VoucherRequest;
import com.cinemas.entities.Voucher;
import org.springframework.data.domain.Page;

public interface VoucherService {
    boolean createVoucher(VoucherRequest voucherRequest);
    Page<Voucher> getAllVoucher(PaginationHelper paginationHelper);
    Voucher getVoucherDetail(Integer id);
    boolean updateVoucher(VoucherRequest voucherRequest);
    Integer deleteVoucher(Integer id);
}
