package com.example.project000056.email;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

public class EmailSendBox {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private JavaMailSenderImpl javaMailSender;

    public EmailSendBox(JavaMailSenderImpl javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    //后加的防止题目过长并且进行全局定义
    static {
        System.setProperty("mail.mime.splitlongparameters","false");
        System.setProperty("mail.mime.charset","UTF-8");
    }

    public EmailSendBox() {

    }

    /**
     * @see #send
     */
    public String SendHtml(String subject, String sendText, String receivers, String ccReceivers) {
        return send(subject, sendText, true, receivers, ccReceivers, null);
    }

    /**
     * @see #send
     */
//    public String SendHtml(String subject, String sendText, String receivers, String ccReceivers,
//                           File[] attaches) {
////        return send(subject, sendText, true, receivers, ccReceivers, attaches);
//    }

    /**
     * @param subject       主题
     * @param sendText      邮件正文
     * @param isHtmlContent 是否html的正文
     * @param receivers     收件人，只接收一个
     * @param ccReceivers   抄送人，多个以comma（半角逗号,）分割，可以为null
     * @param attaches      附件，可以为null
     * @return success 代表成功；error 代表失败
     */
    public String send(String subject, String sendText, boolean isHtmlContent, String receivers, String ccReceivers,
                       File attaches) {
        try {

            final MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
            // 发件人
            helper.setFrom(Objects.requireNonNull(javaMailSender.getUsername()));
            // 收件人
            helper.setTo(receivers.split(","));
            // 抄送人
            if(StringUtils.isNotBlank(ccReceivers)) {
                helper.setCc(ccReceivers.split(","));
            }
            // 邮件主题
            helper.setSubject(subject);
            // 向multipart对象中添加邮件的各个部分内容，包括文本内容和附件
            // 添加邮件正文
            helper.setText(sendText, isHtmlContent);
            // 附件
            if (attaches != null) {

                    if (attaches != null) {
                // helper.addAttachment(attach.getName(), new FileSystemResource(attach));//最开始写的这种没加encode的涉及到中文名的就容易出错
                        helper.addAttachment(MimeUtility.encodeWord(attaches.getName()), new FileSystemResource(attaches));
                    }

            }
            javaMailSender.send(message);
            return "success";
        } catch (Exception e) {
            logger.error("mail {} send error", subject, e);
            return "error";
        }
    }

}