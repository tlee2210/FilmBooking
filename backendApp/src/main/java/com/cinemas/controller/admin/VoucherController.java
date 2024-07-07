package com.cinemas.controller.admin;

import com.cinemas.dto.request.MovieBlogRequest;
import com.cinemas.dto.request.PaginationHelper;
import com.cinemas.dto.request.SearchRequest;
import com.cinemas.dto.request.VoucherRequest;
import com.cinemas.dto.response.APIResponse;
import com.cinemas.entities.MovieBlog;
import com.cinemas.entities.Voucher;
import com.cinemas.exception.AppException;
import com.cinemas.service.admin.VoucherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.cinemas.exception.ErrorCode.CREATE_FAILED;
import static com.cinemas.exception.ErrorCode.UPDATE_FAILED;

@RestController
@RequestMapping("/api/admin/v1/voucher")
@Tag(name = "Dashboard Voucher Controller")
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping
    public APIResponse<Page<Voucher>> getAllVoucher(
            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(required = false, defaultValue = "15") Integer pageSize,
            @RequestParam(required = false, defaultValue = "DESC") Sort.Direction sort
    ) {
        PaginationHelper paginationHelper = new PaginationHelper(pageNo, pageSize, sort, "id");
        APIResponse<Page<Voucher>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(voucherService.getAllVoucher(paginationHelper));

        return apiResponse;
    }

    @PostMapping("/create")
    public APIResponse<String> createVoucher(@RequestBody VoucherRequest voucherRequest) {
        boolean checkCreate = voucherService.createVoucher(voucherRequest);
        if (checkCreate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Voucher created successfully");

            return apiResponse;
        }

        throw new AppException(CREATE_FAILED);
    }

    @GetMapping("/{id}/edit")
    public APIResponse<Voucher> getVoucherById(@PathVariable Integer id) {
        APIResponse<Voucher> apiResponse = new APIResponse();

        apiResponse.setCode(200);
        apiResponse.setResult(voucherService.getVoucherDetail(id));

        return apiResponse;
    }

    @PutMapping("/update")
    public APIResponse<String> updateVoucher(@RequestBody VoucherRequest voucherRequest){
        boolean checkUpdate = voucherService.updateVoucher(voucherRequest);
        if (checkUpdate) {
            APIResponse<String> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Voucher Update successfully");

            return apiResponse;
        }

        throw new AppException(UPDATE_FAILED);
    }

    @DeleteMapping("/delete/{id}")
    public APIResponse<Integer> deleteVoucher(@PathVariable Integer id) {

        Integer idVoucher = voucherService.deleteVoucher(id);
        if (idVoucher > 0) {
            APIResponse<Integer> apiResponse = new APIResponse();
            apiResponse.setCode(200);
            apiResponse.setMessage("Successfully deleted voucher");
            apiResponse.setResult(id);

            return apiResponse;
        }
        throw new AppException(CREATE_FAILED);
    }
}
