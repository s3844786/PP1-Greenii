package com.example.project000056;

import com.example.project000056.qrcode.QRCodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.IOException;

@SpringBootApplication
public class Main {
    public static void main(String[] args) throws IOException, WriterException {
//        System.getProperties().setProperty("mail.mime.splitlongparameters", "false");
//        QRCodeGenerator.generateQRCodeImage("ssss",350,350,"../src/main/resources/QRCode.png");
        SpringApplication.run(Main.class,args);
    }
}