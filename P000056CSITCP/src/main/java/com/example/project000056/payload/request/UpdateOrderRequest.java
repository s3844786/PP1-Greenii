package com.example.project000056.payload.request;

import javax.validation.constraints.NotBlank;

public class UpdateOrderRequest {
    @NotBlank
    private Long id;
    private int process;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getProcess() {
        return process;
    }

    public void setProcess(int process) {
        this.process = process;
    }
}
