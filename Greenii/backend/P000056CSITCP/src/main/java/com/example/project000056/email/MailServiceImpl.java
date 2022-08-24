package com.example.project000056.email;

import com.example.project000056.qrcode.QrCodeUtil;
import com.example.project000056.qrcode.QrCodeUtils;
import com.google.zxing.WriterException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import javax.mail.util.ByteArrayDataSource;
import javax.sql.DataSource;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@Component
public class MailServiceImpl implements MailService{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private JavaMailSender mailSender;

    @Value("${mail.fromMail.addr}")
    private String from;
    private QrCodeUtil QRCodeUtils;


    @Override
    public void sendSimpleMail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);

        try {
            mailSender.send(message);
            logger.info("简单邮件已经发送。");
        } catch (Exception e) {
            logger.error("发送简单邮件时发生异常！", e);
        }

    }

    @Override
    public void sendInlineResourceMail(String to, String subject, String content, String rscPath, String rscId) throws Exception {
//        System.setProperty("mail.mime.splitlongparameters","false");

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);

        File file = new File(rscPath);
        System.out.println(file.exists());
        String fileContent = QrCodeUtils.decode(rscPath);
        System.out.println(fileContent);

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent("","text/html;charset=UTF-8");
        mimeBodyPart.setDataHandler(new DataHandler(new FileDataSource(file)));
        mimeBodyPart.setFileName(MimeUtility.encodeText("test.png"));

        FileSystemResource res = new FileSystemResource(file);
        System.out.println(res);
        helper.addInline(rscId, res);

        mailSender.send(message);
    }

    @Override
    public void sendAttachmentsMail(String to, String subject, String content, String filePath) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);
        FileSystemResource file = new FileSystemResource(new File(filePath));
        String fileName = file.getFilename();
        helper.addAttachment(fileName, file);
        mailSender.send(message);
    }

//    @Override
//    public void sendQrCodeMail(String to, String subject, String content) throws Exception {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMultipart multipart = new MimeMultipart();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//        helper.setFrom(from);
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(content, true);
//        BufferedImage qrcode = QRCodeUtils.createImage("222",null);
//        multipart.addBodyPart(qrcode);
////        ByteArrayOutputStream outputStream = QRCodeUtils.generateQRCodeImage("222", 350, 350);
////        DataSource aAttachment = (DataSource) new ByteArrayDataSource(outputStream.toByteArray(), "application/octet-stream");
////        helper.addInline("pic", (File) aAttachment);
//        mailSender.send(message);
//    }
}
