package com.cinemas.service.impl;

import com.cinemas.dto.MailBody;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.context.Context;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@Service
public class EmailService {
    @Value("${spring.mail.username}")
    private String mail;

    @Autowired
    private final JavaMailSender javaMailSender;
//    @Autowired
//    private TemplateEngine templateEngine;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Autowired
    private SpringTemplateEngine templateEngine;

    public void sendHtmlMail(MailBody mailBody, String templateName) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariables(mailBody.props());

        String html = templateEngine.process(templateName, context);

        helper.setTo(mailBody.to());
        helper.setSubject(mailBody.subject());
        helper.setText(html, true);

        javaMailSender.send(message);
    }

    public void sendSimpleMessage(MailBody mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setFrom(mail);
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());

        javaMailSender.send(message);
    }

//    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;

    public String loadHtmlTemplate(String filePath, Map<String, String> placeholders) throws IOException {
        ClassPathResource resource = new ClassPathResource(filePath);
        String content = new String(Files.readAllBytes(resource.getFile().toPath()));

        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            content = content.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }

        return content;
    }

}
