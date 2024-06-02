package com.cinemas.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRoomRequest extends PaginationHelper {
    public String name;
    public Integer cinemaId;

    public SearchRoomRequest(Integer pageNo, Integer pageSize, Sort.Direction sort, String name, Integer cinemaId) {
        super(pageNo, pageSize, sort, "id");
        this.name = name;
        this.cinemaId = cinemaId;
    }
}
