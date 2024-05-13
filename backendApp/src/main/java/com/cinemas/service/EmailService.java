package com.cinemas.service;

import com.cinemas.dto.MailBody;
import jakarta.mail.MessagingException;
import org.springframework.mail.javamail.JavaMailSender;

public interface EmailService {
    public void sendHtmlMail(MailBody mailBody, String templateName) throws MessagingException;
}
