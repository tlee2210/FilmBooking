package com.cinemas.enums;

public enum ReviewType {
    preview("Preview"),
    review("Review");
    private String value;

    ReviewType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
