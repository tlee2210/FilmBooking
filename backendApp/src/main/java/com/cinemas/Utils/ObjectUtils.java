package com.cinemas.Utils;

import java.lang.reflect.Field;
public class ObjectUtils {
    public static void copyFields(Object source, Object destination) {
        if (source == null || destination == null) {
            throw new IllegalArgumentException("Source and destination cannot be null.");
        }

        Field[] sourceFields = source.getClass().getDeclaredFields();

        for (Field sourceField : sourceFields) {
            try {
                sourceField.setAccessible(true);

                Object value = sourceField.get(source);

                Field destinationField = null;
                try {
                    destinationField = destination.getClass().getDeclaredField(sourceField.getName());
                    destinationField.setAccessible(true);

                    destinationField.set(destination, value);
                } catch (NoSuchFieldException nsfe) {
                    continue;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
