package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HomeResponse {
    List<ItemIntroduce> movieShowingList;
    List<ItemIntroduce> movieSoonList;
    List<ItemIntroduce> movieBlogList;
    List<ItemIntroduce> reviewList;
    HomeSliderResponse slider;
    List<SelectOptionReponse<?>> selectOptionList;

}
