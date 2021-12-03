package com.example.demo;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MessageSenderService {
    
    private JavaMailSender mailSender;

    public MessageSenderService(JavaMailSender mailSender)
    {
        this.mailSender = mailSender;
    }

    public void sendMail(String toEmail, String subject, String message) {

        var mailMessage = new SimpleMailMessage();

        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailMessage.setFrom("carparkingsolutions.oopproject@gmail.com");

        mailSender.send(mailMessage);
    }
}
