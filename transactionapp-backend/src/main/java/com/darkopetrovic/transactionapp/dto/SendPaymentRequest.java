package com.darkopetrovic.transactionapp.dto;

import java.math.BigDecimal;

public class SendPaymentRequest {

    private String email;
    private BigDecimal amount;
    private String description;

    public SendPaymentRequest(String email, BigDecimal amount, String description) {
        this.email = email;
        this.amount = amount;
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
