package com.darkopetrovic.transactionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDto {
    private Long id;
    private final BigDecimal amount;
    private final LocalDateTime dateCreated;
    private final String counterpartEmail;
    private String description;
    private String counterpartFirstname;
    private String counterpartLastname;
    private boolean isSender;

    public TransactionDto(Long id, BigDecimal amount, LocalDateTime dateCreated, String counterpartEmail, String counterpartFirstname, String counterpartLastname, boolean isSender) {
        this.id = id;
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.counterpartEmail = counterpartEmail;
        this.counterpartFirstname = counterpartFirstname;
        this.counterpartLastname = counterpartLastname;
        this.isSender = isSender;
    }

    public TransactionDto(
            Long id,
            BigDecimal amount,
            LocalDateTime dateCreated,
            String description,
            String counterpartEmail,
            String counterpartFirstname,
            String counterpartLastname,
            boolean isSender
    ) {
        this.id = id;
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.description = description;
        this.counterpartEmail = counterpartEmail;
        this.counterpartFirstname = counterpartFirstname;
        this.counterpartLastname = counterpartLastname;
        this.isSender = isSender;
    }

    public TransactionDto(BigDecimal amount, LocalDateTime dateCreated, String counterpartEmail) {
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.counterpartEmail = counterpartEmail;
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

    public String getDescription() {
        return description;
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
