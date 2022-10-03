package com.example.project000056.email;

import com.google.zxing.WriterException;

import javax.mail.MessagingException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface MailService {
    void sendSimpleMail(String to, String subject, String content);
//    void sendQrCodeMail(String to, String subject, String content) throws Exception;
    void sendInlineResourceMail(String to, String subject, String content, String rscPath, String rscId) throws Exception;

    void sendAttachmentsMail(String to, String subject, String content, String filePath) throws MessagingException;
}
