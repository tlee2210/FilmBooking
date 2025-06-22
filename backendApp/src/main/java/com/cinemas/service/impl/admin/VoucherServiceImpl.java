package com.cinemas.service.impl.admin;

import com.cinemas.Utils.ObjectUtils;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.VoucherRequest;
import com.cinemas.entities.MovieBlog;
import com.cinemas.entities.Voucher;
import com.cinemas.entities.imageDescription;
import com.cinemas.enums.StatusVoucher;
import com.cinemas.exception.AppException;
import com.cinemas.repositories.VoucherRepository;
import com.cinemas.service.admin.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.cinemas.exception.ErrorCode.NAME_EXISTED;
import static com.cinemas.exception.ErrorCode.NOT_FOUND;

@Component
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public boolean createVoucher(VoucherRequest voucherRequest) {

        if (voucherRepository.findByCode(voucherRequest.getCode()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        if (voucherRequest.getCode() == null || voucherRequest.getCode().isEmpty()) {
            voucherRequest.setCode(UUID.randomUUID().toString().replace("-", "").substring(0, 10));
        }

//        Voucher voucher = new Voucher();
//        ObjectUtils.copyFields(voucherRequest, voucher);
//        voucher.setUsedCount(0);
//        voucher.setStatusVoucher(StatusVoucher.ACTIVE);

        Voucher voucher = Voucher.builder()
                .id(voucherRequest.getId())
                .code(voucherRequest.getCode())
                .discountType(voucherRequest.getDiscountType())
                .discountValue(voucherRequest.getDiscountValue())
                .expirationDate(voucherRequest.getExpirationDate())
                .usageLimit(voucherRequest.getUsageLimit())
                .usedCount(0)
                .minSpend(voucherRequest.getMinSpend())
                .maxDiscount(voucherRequest.getMaxDiscount())
                .statusVoucher(StatusVoucher.ACTIVE)
                .build();

        voucherRepository.save(voucher);
        return true;
    }

    @Override
    public Page<Voucher> getAllVoucher(PaginationHelper paginationHelper) {
        List<Voucher> vouchers = voucherRepository.findAll();

        PagedListHolder<Voucher> pagedListHolder = new PagedListHolder<Voucher>(vouchers);
        pagedListHolder.setPage(paginationHelper.getPageNo());
        pagedListHolder.setPageSize(paginationHelper.getPageSize());

        List<Voucher> pageList = pagedListHolder.getPageList();
        boolean ascending = paginationHelper.getSort().isAscending();
        PropertyComparator.sort(pageList, new MutableSortDefinition(paginationHelper.getSortByColumn(), true, ascending));

        Page<Voucher> voucherList = new PageImpl<>(pageList, new PaginationHelper().getPageable(paginationHelper), vouchers.size());

        return voucherList;
    }

    @Override
    public Voucher getVoucherDetail(Integer id) {
        Optional<Voucher> voucher = voucherRepository.findById(id);

        if (voucher.isEmpty()) throw new AppException(NOT_FOUND);

        return voucher.get();
    }

    @Override
    public boolean updateVoucher(VoucherRequest voucherRequest) {
        Voucher voucher = voucherRepository.findById(voucherRequest.getId()).orElseThrow(() -> new AppException(NOT_FOUND));

        if (voucherRepository.findByCodeAndId(voucherRequest.getCode(), voucherRequest.getId()) != null) {
            throw new AppException(NAME_EXISTED);
        }

        ObjectUtils.copyFields(voucherRequest, voucher);
        voucherRepository.save(voucher);
        return true;
    }

    @Override
    public Integer deleteVoucher(Integer id) {
        Optional<Voucher> voucher = voucherRepository.findById(id);

        if (voucher.get() == null) throw new AppException(NOT_FOUND);

        voucherRepository.delete(voucher.get());
        return voucher.get().getId();
    }
}
