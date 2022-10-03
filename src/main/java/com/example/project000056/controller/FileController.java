//package com.example.project000056.controller;
//
//
//import com.example.project000056.payload.response.MessageResponse;
//import com.example.project000056.security.services.FileStorageService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//@Controller
//@CrossOrigin(origins = "*", maxAge = 3600)
//public class FileController {
//
//  @Autowired
//  private FileStorageService storageService;
//
//  @PostMapping("/api/auth/orders/upload")
//  public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file) {
//    String message = "";
//    try {
//      storageService.store(file);
//
//      message = "Uploaded the file successfully: " + file.getOriginalFilename();
//      return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
//    } catch (Exception e) {
//      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
//      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
//    }
//  }
//
//}
