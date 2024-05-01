package com.cinemas.dto;

import lombok.Builder;

import java.util.Map;

@Builder
public record MailBody(String to, String subject, String text, Map<String, Object> props) {

}
