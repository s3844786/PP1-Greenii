package com.example.project000056.payload.request;

import javax.validation.constraints.NotBlank;

public class DriverOrderRequest {
    @NotBlank
    private int driverID;

    public int getDriverID() {
        return driverID;
    }

    public void setDriverID(int driverID) {
        this.driverID = driverID;
    }
}
