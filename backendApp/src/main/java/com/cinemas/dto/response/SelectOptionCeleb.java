package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SelectOptionCeleb<T> {
    private List<SelectOptionReponse> selectOptionCountry;
    private T Model;

    public SelectOptionCeleb(T model, List<SelectOptionReponse> selectOptionCountry) {
        this.selectOptionCountry = selectOptionCountry;
        Model = model;
    }
}
