package com.cinemas.dto.request;

import lombok.Data;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Objects;

@Data
public class PaginationHelper {
    private Integer pageNo = 0;
    private Integer pageSize = 15;
    private Sort.Direction sort = Sort.Direction.ASC;
    private  String sortByColumn = "id";

    public Pageable getPageable(PaginationHelper PaginationHelper) {
        Integer page = Objects.nonNull(PaginationHelper.getPageNo()) ? PaginationHelper.getPageNo() : this.pageNo;
        Integer size = Objects.nonNull(PaginationHelper.getPageSize()) ? PaginationHelper.getPageSize() : this.pageSize;
        Sort.Direction sort = Objects.nonNull(PaginationHelper.getSort()) ? PaginationHelper.getSort() : this.sort;
        String sortByColumn = Objects.nonNull(PaginationHelper.getSortByColumn()) ? PaginationHelper.getSortByColumn() : this.sortByColumn;

        PageRequest rs = PageRequest.of(page, size, sort, sortByColumn);
        return rs;
    }
}
