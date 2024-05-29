package com.cinemas.dto.request;

import com.cinemas.enums.MovieStatus;
import com.cinemas.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchUser extends PaginationHelper{
    private String name;
    private RoleType role;

    public SearchUser(String name, RoleType role, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.name = name;
        this.role = role;
    }
}
