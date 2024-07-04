package com.cinemas.enums;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MovieFormat {
    TWO_D_SUBTITLED("2D Subtitled"),
    TWO_D_DUBBED("2D Dubbed"),
    THREE_D_SUBTITLED("3D Subtitled"),
    THREE_D_DUBBED("3D Dubbed"),
    IMAX("IMAX"),
    FOUR_DX("4DX"),
    SCREEN_X("ScreenX"),
    FOUR_K_ULTRA_HD("4K Ultra HD");
    private String value;

    MovieFormat(String value) {
        this.value = value;
    }
    @JsonValue
    public String getValue() {
        return value;
    }
}
