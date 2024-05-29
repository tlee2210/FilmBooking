package com.cinemas.dto.response;

import com.cinemas.entities.Movie;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SelectOptionAndModelReponse<T> {

    private List<SelectOptionReponse> selectOptionReponse;
    private List<SelectOptionReponse> selectOptionStatus;
    private List<SelectOptionReponse> selectOptionCountry;
    private T Model;

    public SelectOptionAndModelReponse(T model, List<SelectOptionReponse> selectOptionCountry, List<SelectOptionReponse> selectOptionStatus) {
        Model = model;
        this.selectOptionCountry = selectOptionCountry;
        this.selectOptionStatus = selectOptionStatus;
    }

    public SelectOptionAndModelReponse(List<SelectOptionReponse> selectOptionReponse, T model) {
        this.selectOptionReponse = selectOptionReponse;
        Model = model;
    }
}
