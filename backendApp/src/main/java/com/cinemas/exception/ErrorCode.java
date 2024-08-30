package com.cinemas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "Uncategorized error"),

    INVALID_KEY(HttpStatus.BAD_REQUEST, "Uncategorized error"),

    UNAUTHENTICATED(HttpStatus.UNAUTHORIZED, "Unauthenticated"),

    UNAUTHORIZED(HttpStatus.FORBIDDEN, "You do not have permission"),

//    LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "Invalid credentials provided"),

    LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "Invalid email or password"),

    USER_NOT_EXISTED("User not existed", HttpStatus.NOT_FOUND, "Not Found"),

    USER_EXISTED(HttpStatus.BAD_REQUEST, "User existed"),

    NAME_EXISTED(HttpStatus.BAD_REQUEST, "Name existed"),

    EMAIL_EXISTED(HttpStatus.BAD_REQUEST, "Email existed"),

    CELEBRITY_EXISTED(HttpStatus.BAD_REQUEST, "Celebrity existed"),

    PROVIDE_VALID(HttpStatus.BAD_REQUEST, "please provide an valid email"),

    OTP_EXPIRED(HttpStatus.EXPECTATION_FAILED, "Invalid OTP!"),

    CONFIRM_PASSWORD(HttpStatus.EXPECTATION_FAILED, "please enter the Password again!"),
    INVALID_CURRENT_PASSWORD(HttpStatus.UNAUTHORIZED, "Current password is incorrect"),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "Email not found"),

    NOT_FOUND(HttpStatus.NOT_FOUND, "not found"),

    VOUCHER_NOT_FOUND(HttpStatus.NOT_FOUND, "Voucher not found"),
    VOUCHER_EXPIRED(HttpStatus.BAD_REQUEST, "Voucher has expired"),
    VOUCHER_NOT_ELIGIBLE(HttpStatus.BAD_REQUEST, "Voucher is not eligible for use"),
    VOUCHER_USAGE_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "Voucher usage limit exceeded"),
    VOUCHER_ALREADY_USED(HttpStatus.BAD_REQUEST, "Voucher has already been used"),
    NOT_FOUND_MOVIE(HttpStatus.NOT_FOUND, "not found movie"),
    NOT_FOUND_CINEMA(HttpStatus.NOT_FOUND, "not found cinema"),

    NOT_FOUND_ROOM(HttpStatus.NOT_FOUND, "not found room"),
    //    USERNAME_INVALID("{field} must be at least {min} characters", HttpStatus.BAD_REQUEST, "Validation Error"),
    INVALID_EMAIL("Invalid email format", HttpStatus.BAD_REQUEST, "Validation Error"),

    INVALID_DOB("Your age must be at least {min}", HttpStatus.BAD_REQUEST, "Validation Error"),

    VALIDATION("This {field} cannot be null. Please provide a valid value.", HttpStatus.BAD_REQUEST, "Validation Error"),

    FIELD_TOO_LENGTH("{field} must be at least {min} characters", HttpStatus.BAD_REQUEST, "Validation Error"),

    CREATE_FAILED(HttpStatus.BAD_REQUEST, "Create failed"),
    DELETE_FAILED(HttpStatus.BAD_REQUEST, "Delete failed"),

    UPDATE_FAILED(HttpStatus.BAD_REQUEST, "Update failed"),
    ;

    public String getMessageDetail() {
        return messageDetail;
    }

    public void setMessageDetail(String messageDetail) {
        this.messageDetail = messageDetail;
    }

    public HttpStatusCode getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(HttpStatusCode statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

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
