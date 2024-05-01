package com.cinemas.exception;

import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "Uncategorized error"),

    INVALID_KEY(HttpStatus.BAD_REQUEST, "Uncategorized error"),

    UNAUTHENTICATED(HttpStatus.UNAUTHORIZED, "Unauthenticated"),

    UNAUTHORIZED(HttpStatus.FORBIDDEN, "You do not have permission"),

    USER_NOT_EXISTED("User not existed", HttpStatus.NOT_FOUND, "Not Found"),

    USER_EXISTED(HttpStatus.BAD_REQUEST, "User existed"),

    EMAIL_EXISTED(HttpStatus.BAD_REQUEST, "Email existed"),

    //    USERNAME_INVALID("{field} must be at least {min} characters", HttpStatus.BAD_REQUEST, "Validation Error"),
    INVALID_EMAIL("Invalid email format", HttpStatus.BAD_REQUEST, "Validation Error"),

    INVALID_DOB("Your age must be at least {min}", HttpStatus.BAD_REQUEST, "Validation Error"),

    VALIDATION("This {field} cannot be null. Please provide a valid value.", HttpStatus.BAD_REQUEST, "Validation Error"),

    FIELD_TOO_LENGTH("{field} must be at least {min} characters", HttpStatus.BAD_REQUEST, "Validation Error"),

    ;
    private String messageDetail;
    private HttpStatusCode statusCode;
    private String message;


    ErrorCode(String messageDetail, HttpStatusCode statusCode, String message) {
        this.messageDetail = messageDetail;
        this.statusCode = statusCode;
        this.message = message;
    }

    ErrorCode(HttpStatusCode statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

}
