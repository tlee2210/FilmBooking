package com.cinemas.exception;

import lombok.Data;

@Data
public class AppException extends RuntimeException {
    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessageDetail());
        this.errorCode = errorCode;
    }

    public AppException(ErrorCode errorCode, String message) {
        super(errorCode.getMessageDetail());
        this.errorCode = errorCode;
        this.errorCode.setMessage(message);
    }

    private ErrorCode errorCode;
    private String message;
}
