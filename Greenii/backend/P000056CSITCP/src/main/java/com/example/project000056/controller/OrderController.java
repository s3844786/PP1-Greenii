package com.example.project000056.controller;
import com.example.project000056.email.MailService;
import com.example.project000056.model.Order;
import com.example.project000056.model.User;
import com.example.project000056.payload.request.AcceptOrderRequest;
import com.example.project000056.payload.request.DriverOrderRequest;
import com.example.project000056.payload.request.UpdateOrderRequest;
import com.example.project000056.payload.response.MessageResponse;
import com.example.project000056.qrcode.QRCodeGenerator;
import com.example.project000056.repository.OrderRepository;
import com.example.project000056.singleton.userHolder;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth/orders")
public class OrderController {
    @Autowired
    OrderRepository orderRepository;
    private userHolder userHolder;
    private User user;

    @Autowired
    private MailService MailService;

    @Autowired
    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    @PostMapping(value="/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "create Order by sending order details and return label")
    public ResponseEntity<?> createOrder(@RequestParam String senderName, @RequestParam String senderPhonenumber, @RequestParam String senderAddress,
                                         @RequestParam String receiverName, @RequestParam String receiverPhonenumber, @RequestParam String receiverAddress,
                                         @RequestParam String productType, @RequestParam String productWeight, @RequestParam String startDate,
                                         @RequestParam String startTime, @RequestParam("returnLabel") MultipartFile file, @RequestParam double longitude,
                                         @RequestParam double latitude, @RequestParam String status, @RequestParam int process) {
        try {
            // get uploaded filename
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // get logged in user
            userHolder = userHolder.getInstance();
            user = userHolder.getUser();
            System.out.println(user.getId());

            String orderDetail = "";
            orderDetail = "senderName: " + senderName + "\r\nsenderPhonenumber: " + senderPhonenumber + "\r\nsenderAddress: "+ senderAddress
            + "\r\nreceiverName: " + receiverName + "\r\nreceiverPhonenumber: " + receiverPhonenumber + "\r\nreceiverAddress: "+receiverAddress
            + "\r\nproductType: " + productType + "\r\nproductWeight: "+productWeight + "\r\nstartDate: "+startDate + "\r\nstartTime: "+startTime;
            System.out.println(user.getEmail());

            QRCodeGenerator.generateQRCodeImage(orderDetail,350,350,"order.png");
            MailService.sendAttachmentsMail(user.getEmail(),"QRCode for order details","Order created successfully!","order.png");

            Order newOrder = new Order(senderName,senderPhonenumber,senderAddress,
                    receiverName,receiverPhonenumber,receiverAddress,
                    productType, productWeight, startDate,startTime,
                    fileName,file.getContentType(),file.getBytes(),user.getId(),longitude,
                    latitude,status,process);
            orderRepository.save(newOrder);

            return ResponseEntity.ok(new MessageResponse("Order created successfully!"));
        } catch (Exception e) {
            return ResponseEntity.ok(new MessageResponse("Order failed!"));
        }
    }

    //get Order by UserID
    @GetMapping("/getAll")
    List<Order> getOrderByUserId(@RequestParam(value = "userid") Long userid) {
        return orderRepository.findOrderByUserID(userid);
    }

    //get Order by ID
    @GetMapping("/getOrder")
    Optional<Order> getOrderById(@RequestParam(value = "id") Long id) {
        return orderRepository.findById(id);
    }

    //get Order which status is waiting
    @GetMapping("/getWaitingOrder")
    List<Order> getWaitingOrder() {
        return orderRepository.findWaitingOrder();
    }

    //accept order
    @PutMapping("/acceptOrder")
    public ResponseEntity AcceptOrder(@RequestBody AcceptOrderRequest acceptOrderRequest) {
        Optional<Order> order = orderRepository.findById(acceptOrderRequest.getId());
        Order acceptOrder = order.get();
        acceptOrder.setStatus("process");
        acceptOrder.setDriverID(acceptOrderRequest.getDriverID());
        acceptOrder.setProcess(1);
        orderRepository.save(acceptOrder);
        return ResponseEntity.ok(new MessageResponse("Order accepted"));
    }

//    //get Order by DriverID
//    @GetMapping("/getDriverOrders")
//    List<Order> getDriverOrders(@RequestBody DriverOrderRequest driverOrderRequest) {
//        return orderRepository.findByDriverID(driverOrderRequest.getDriverID());
//    }

    //get Order by DriverID
    @GetMapping("/getDriverOrders")
    List<Order> getDriverOrders(@RequestParam(value = "driverID") int driverID) {
        return orderRepository.findByDriverID(driverID);
    }

    //update order
    @PutMapping("/updateOrder")
    public ResponseEntity updateOrder(@RequestBody UpdateOrderRequest updateOrderRequest) {
        Optional<Order> order = orderRepository.findById(updateOrderRequest.getId());
        Order UpdateOrder = order.get();
        UpdateOrder.setProcess(updateOrderRequest.getProcess());
        if(UpdateOrder.getProcess() == 3 ) {
            UpdateOrder.setStatus("finish");
        }
        orderRepository.save(UpdateOrder);
        return ResponseEntity.ok(new MessageResponse("Order updated"));
    }

}