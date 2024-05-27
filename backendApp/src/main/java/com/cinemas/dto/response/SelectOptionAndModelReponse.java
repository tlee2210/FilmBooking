package com.cinemas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectOptionAndModelReponse<T> {

    private List<SelectOptionReponse> selectOptionReponse;
    private T Model;

}
