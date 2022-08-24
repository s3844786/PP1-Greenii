package com.example.project000056.model;

import javax.persistence.*;

@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sender_name;
    private String sender_phone;
    private String sender_address;
    private String receiver_name;
    private String receiver_phone;
    private String receiver_address;
    private String product_type;
    private String product_weight;
    private String pickup_date;
    private String pickup_time;
    private double latitude;
    private double longitude;
    private String status;
    private int process;
    private int driverID;
    private Long userID;
    //file upload
    private String name;
    private String type;
    @Lob
    private byte[] data;

//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(	name = "order_user",
//            joinColumns = @JoinColumn(
//                    name = "order_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(
//                    name = "user_id", referencedColumnName = "id")
//    )
//    Set<User> user = new HashSet<>();


    public Order() {

    }
//      public Order(String name, String type, byte[] data) {
//    this.name = name;
//    this.type = type;
//    this.data = data;
//  }


    public Order(Long id, int driverID) {
        this.id = id;
        this.driverID = driverID;
    }

    public Order(String sender_name, String sender_phone) {
        this.sender_name = sender_name;
        this.sender_phone = sender_phone;
    }

    public Order(String sender_name, String sender_phone, String sender_address, String receiver_name, String receiver_phone, String receiver_address, String product_type, String product_weight, String pickup_date, String pickup_time, String name, String type, byte[] data, Long userID) {
        this.sender_name = sender_name;
        this.sender_phone = sender_phone;
        this.sender_address = sender_address;
        this.receiver_name = receiver_name;
        this.receiver_phone = receiver_phone;
        this.receiver_address = receiver_address;
        this.product_type = product_type;
        this.product_weight = product_weight;
        this.pickup_date=pickup_date;
        this.pickup_time = pickup_time;
        this.name = name;
        this.type = type;
        this.data = data;
        this.userID = userID;
    }

    public Order(String sender_name, String sender_phone, String sender_address, String receiver_name, String receiver_phone, String receiver_address, String product_type, String product_weight, String pickup_date, String pickup_time, String name, String type, byte[] data, Long userID, double longitude,
                 double latitude, String status, int process) {
        this.sender_name = sender_name;
        this.sender_phone = sender_phone;
        this.sender_address = sender_address;
        this.receiver_name = receiver_name;
        this.receiver_phone = receiver_phone;
        this.receiver_address = receiver_address;
        this.product_type = product_type;
        this.product_weight = product_weight;
        this.pickup_date=pickup_date;
        this.pickup_time = pickup_time;
        this.name = name;
        this.type = type;
        this.data = data;
        this.userID = userID;
        this.longitude=longitude;
        this.latitude = latitude;
        this.status = status;
        this.process = process;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender_name() {
        return sender_name;
    }

    public void setSender_name(String sender_name) {
        this.sender_name = sender_name;
    }

    public String getSender_phone() {
        return sender_phone;
    }

    public void setSender_phone(String sender_phone) {
        this.sender_phone = sender_phone;
    }

    public String getSender_address() {
        return sender_address;
    }

    public void setSender_address(String sender_address) {
        this.sender_address = sender_address;
    }

    public String getReceiver_name() {
        return receiver_name;
    }

    public void setReceiver_name(String receiver_name) {
        this.receiver_name = receiver_name;
    }

    public String getReceiver_phone() {
        return receiver_phone;
    }

    public void setReceiver_phone(String receiver_phone) {
        this.receiver_phone = receiver_phone;
    }

    public String getReceiver_address() {
        return receiver_address;
    }

    public void setReceiver_address(String receiver_address) {
        this.receiver_address = receiver_address;
    }

    public String getProduct_type() {
        return product_type;
    }

    public void setProduct_type(String product_type) {
        this.product_type = product_type;
    }

    public String getProduct_weight() {
        return product_weight;
    }

    public void setProduct_weight(String product_weight) {
        this.product_weight = product_weight;
    }

    public String getPickup_time() {
        return pickup_time;
    }

    public void setPickup_time(String pickup_time) {
        this.pickup_time = pickup_time;
    }

    public String getPickup_date() {
        return pickup_date;
    }

    public void setPickup_date(String pickup_date) {
        this.pickup_date = pickup_date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String order_status) {
        this.status = order_status;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getProcess() {
        return process;
    }

    public void setProcess(int process) {
        this.process = process;
    }

    public int getDriverID() {
        return driverID;
    }

    public void setDriverID(int driverID) {
        this.driverID = driverID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}