package com.cinemas.dto.request;

import com.cinemas.enums.RoleCeleb;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequest extends PaginationHelper{
    public String searchname;
    public RoleCeleb role;

    public SearchRequest(String searchname, RoleCeleb role,Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.searchname = searchname;
        this.role = role;
    }

    public SearchRequest(String searchname,Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.searchname = searchname;
    }

}
