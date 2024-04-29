package com.cinemas.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.constraints.Size;

public class SizeValidator implements ConstraintValidator<Size, String> {
    private int min;
    private int max;

    @Override
    public void initialize(Size size) {
        this.min = size.min();
        this.max = size.max();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        if (value.length() < min) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("FIELD_TOO_SHORT")
                    .addConstraintViolation();
            return false;
        }

        if (value.length() > max) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("FIELD_TOO_LONG")
                    .addConstraintViolation();
            return false;
        }

        return true; // Passes both checks
    }
}
