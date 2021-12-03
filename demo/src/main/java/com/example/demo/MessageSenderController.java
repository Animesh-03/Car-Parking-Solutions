package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/sendMessage")
public class MessageSenderController
{
    @Autowired
    private MessageSenderService mailSenderService;

    @GetMapping(value="/send")
    public @ResponseBody String postMethodName(@RequestParam String to, @RequestParam String sub, @RequestParam String body) {

        mailSenderService.sendMail(to, sub, body);

        return "Sent";
    }
    
}