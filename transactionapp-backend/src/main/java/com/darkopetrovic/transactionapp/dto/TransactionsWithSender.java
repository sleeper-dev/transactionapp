package com.darkopetrovic.transactionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionsWithSender {
    private final Long id;
    private final BigDecimal amount;
    private final LocalDateTime dateCreated;
    private final String counterpartEmail;
    private final String counterpartFirstname;
    private final String counterpartLastname;
    private final boolean isSender;

    public TransactionsWithSender(Long id, BigDecimal amount, LocalDateTime dateCreated, String counterpartEmail, String counterpartFirstname, String counterpartLastname, boolean isSender) {
        this.id = id;
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.counterpartEmail = counterpartEmail;
        this.counterpartFirstname = counterpartFirstname;
        this.counterpartLastname = counterpartLastname;
        this.isSender = isSender;
    }

    public Long getId() {
        return id;
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
