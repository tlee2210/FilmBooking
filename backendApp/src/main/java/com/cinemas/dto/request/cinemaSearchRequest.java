package com.cinemas.dto.request;

import com.cinemas.enums.RoleCeleb;
import com.cinemas.enums.StatusCinema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class cinemaSearchRequest extends PaginationHelper {
    public String searchname;
    public StatusCinema status;
    public String city;

    public cinemaSearchRequest(String searchname, StatusCinema status, String city, Integer pageNo, Integer pageSize, Sort.Direction sort) {
        super(pageNo, pageSize, sort, "id");
        this.searchname = searchname;
        this.status = status;
        this.city = city;
    }
}
