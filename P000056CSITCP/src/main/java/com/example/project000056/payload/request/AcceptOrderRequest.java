package com.example.project000056.payload.request;

import javax.validation.constraints.NotBlank;

public class AcceptOrderRequest {
    @NotBlank
    private Long id;

    @NotBlank
    private int driverID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDriverID() {
        return driverID;
    }

    public void setDriverID(int driverID) {
        this.driverID = driverID;
    }
}
