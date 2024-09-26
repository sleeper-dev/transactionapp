package com.darkopetrovic.transactionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDto {
    private BigDecimal amount;
    private LocalDateTime dateCreated;
    private String senderEmail;

    public TransactionDto(BigDecimal amount, LocalDateTime dateCreated, String senderEmail) {
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.senderEmail = senderEmail;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public String getSenderEmail() {
        return senderEmail;
    }
}
