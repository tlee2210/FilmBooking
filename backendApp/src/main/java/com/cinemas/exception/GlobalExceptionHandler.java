package com.cinemas.exception;

import com.cinemas.dto.response.APIResponse;
import jakarta.validation.ConstraintViolation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final String MIN_ATTRIBUTE = "min";

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<APIResponse> handlingRuntimeException(RuntimeException exception) {
        APIResponse apiResponse = new APIResponse<>();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getStatusCode().value());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(value = IOException.class)
    ResponseEntity<APIResponse> handleIOException(IOException exception) {
        APIResponse apiResponse = new APIResponse<>();
        apiResponse.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        apiResponse.setMessage("An I/O error occurred: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }

    @ExceptionHandler(value = AuthenticationException.class)
    ResponseEntity<APIResponse> handlingAuthenticationException(AuthenticationException exception) {
        APIResponse apiResponse = new APIResponse<>();
        apiResponse.setCode(ErrorCode.LOGIN_FAIL.getStatusCode().value());
        apiResponse.setMessage(ErrorCode.LOGIN_FAIL.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<APIResponse> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        APIResponse apiResponse = new APIResponse();

        apiResponse.setCode(errorCode.getStatusCode().value());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<APIResponse> handlingAccessDeniedException(AccessDeniedException exception) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

        return ResponseEntity.status(errorCode.getStatusCode())
                .body(APIResponse.builder()
                        .code(errorCode.getStatusCode().value())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<APIResponse> handlingValidationException(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();

        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        Map<String, String> errors = new HashMap<>();
        try {
            errorCode = ErrorCode.valueOf(enumKey);

            exception.getBindingResult().getFieldErrors().forEach(error -> {

                ErrorCode errortype = ErrorCode.valueOf(error.getDefaultMessage());

                var constraintViolation = error.unwrap(ConstraintViolation.class);

                Map<String, Object> attributes = constraintViolation.getConstraintDescriptor().getAttributes();

                String errorMessage = Objects.nonNull(attributes)
                        ? mapAttribute(errortype.getMessageDetail(), attributes)
                        : errortype.getMessageDetail();
                errorMessage = errorMessage.replace("{field}", error.getField());
                errors.put(error.getField(), errorMessage);
            });

        } catch (IllegalArgumentException e) {

        }

        APIResponse apiResponse = new APIResponse();

        apiResponse.setCode(errorCode.getStatusCode().value());
        apiResponse.setMessage(errorCode.getMessage());
        apiResponse.setResult(errors);

        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{" + MIN_ATTRIBUTE + "}", minValue);
    }
}
