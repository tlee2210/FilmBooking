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
public class SelectOptionMovie<T> {
    private List<SelectOptionReponse> selectCategories;
    private List<SelectOptionReponse> selectDirectories;
    private List<SelectOptionReponse> selectActors;
    private T Model;

    public SelectOptionMovie(List<SelectOptionReponse> selectCategories, List<SelectOptionReponse> selectDirectories, List<SelectOptionReponse> selectActors){
        this.selectCategories = selectCategories;
        this.selectDirectories = selectDirectories;
        this.selectActors = selectActors;
    }
}
