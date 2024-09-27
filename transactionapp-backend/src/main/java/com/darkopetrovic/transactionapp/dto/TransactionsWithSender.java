package com.darkopetrovic.transactionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionsWithSender {
    private BigDecimal amount;
    private LocalDateTime dateCreated;
    private String counterpartEmail;
    private String counterpartFirstname;
    private String counterpartLastname;
    private boolean isSender;

    public TransactionsWithSender(BigDecimal amount, LocalDateTime dateCreated, String counterpartEmail, String counterpartFirstname, String counterpartLastname, boolean isSender) {
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.counterpartEmail = counterpartEmail;
        this.counterpartFirstname = counterpartFirstname;
        this.counterpartLastname = counterpartLastname;
        this.isSender = isSender;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public String getCounterpartEmail() {
        return counterpartEmail;
    }

    public String getCounterpartFirstname() {
        return counterpartFirstname;
    }

    public String getCounterpartLastname() {
        return counterpartLastname;
    }

    public boolean isSender() {
        return isSender;
    }
}
