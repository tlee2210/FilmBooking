package com.cinemas.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ReviewType {
    preview("Preview"),
    review("Review");
    private String value;

    ReviewType(String value) {
        this.value = value;
    }
    @JsonValue
    public String getValue() {
        return value;
    }
}
