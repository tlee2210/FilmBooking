package com.cinemas.exception;

import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "Uncategorized error"),
    INVALID_KEY(HttpStatus.BAD_REQUEST, "Uncategorized error"),
    USER_EXISTED(HttpStatus.BAD_REQUEST, "User existed"),

    UNAUTHENTICATED(HttpStatus.UNAUTHORIZED, "Unauthenticated"),
    UNAUTHORIZED(HttpStatus.FORBIDDEN, "You do not have permission"),

    USER_NOT_EXISTED("User not existed", HttpStatus.NOT_FOUND, "Not Found"),

    USERNAME_INVALID("Username must be at least {min} characters", HttpStatus.BAD_REQUEST, "Validation Error"),
    INVALID_PASSWORD("Password must be at least {min} characters", HttpStatus.BAD_REQUEST, "Validation Error"),
    INVALID_DOB("Your age must be at least {min}", HttpStatus.BAD_REQUEST, "Validation Error"),
    ;
    //    private int code;
    private String messageDetail;
    private HttpStatusCode statusCode;
    private String message;


    ErrorCode(String messageDetail, HttpStatusCode statusCode, String message) {
//        this.code = code;
        this.messageDetail = messageDetail;
        this.statusCode = statusCode;
        this.message = message;
    }

    ErrorCode(HttpStatusCode statusCode, String message) {
//        this.code = code;
        this.statusCode = statusCode;
        this.message = message;
    }

}
