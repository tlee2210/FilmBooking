package com.cinemas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemIntroduce {
    private Integer id;
    private String name;
    private String slug;
    private String description;
    private String imagePortrait;
    private String trailer;

    public ItemIntroduce(Integer id, String name, String slug, String imagePortrait) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.imagePortrait = imagePortrait;
    }

    public ItemIntroduce(Integer id, String name, String slug, String imagePortrait, String description) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.imagePortrait = imagePortrait;
        this.description = description;
    }
}
