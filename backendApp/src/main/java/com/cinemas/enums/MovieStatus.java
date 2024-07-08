package com.cinemas.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonCreator;

public enum MovieStatus {
    NOW_SHOWING("Now Showing"),
    COMING_SOON("Coming Soon"),
    NO_LONGER_SHOWING("No Longer Showing"),
    SPECIAL_SCREENING("Special Screening"),
    LIMITED_RELEASE("Limited Release"),
    FESTIVAL_SCREENING("Festival Screening");
    private String value;
    MovieStatus(String value) {
        this.value = value;
    }
    @JsonValue
    public String getValue() {
        return value;
    }

}
