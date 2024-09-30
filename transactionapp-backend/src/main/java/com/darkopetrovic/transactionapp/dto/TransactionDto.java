package com.darkopetrovic.transactionapp.dto;

import com.darkopetrovic.transactionapp.utils.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDto {
    private Long id;
    private BigDecimal amount;
    private LocalDateTime dateCreated;
    private String counterpartEmail;
    private String description;
    private String counterpartFirstname;
    private String counterpartLastname;
    private boolean refunded;
    private TransactionType type;
    private boolean isSender;

    public TransactionDto(Long id, BigDecimal amount, LocalDateTime dateCreated, String counterpartEmail, String counterpartFirstname, String counterpartLastname, boolean refunded, TransactionType type, boolean isSender) {
        this.id = id;
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.counterpartEmail = counterpartEmail;
        this.counterpartFirstname = counterpartFirstname;
        this.counterpartLastname = counterpartLastname;
        this.refunded = refunded;
        this.type = type;
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
            boolean refunded,
            TransactionType type,
            boolean isSender
    ) {
        this.id = id;
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.description = description;
        this.counterpartEmail = counterpartEmail;
        this.counterpartFirstname = counterpartFirstname;
        this.counterpartLastname = counterpartLastname;
        this.refunded = refunded;
        this.type = type;
        this.isSender = isSender;
    }

    public TransactionDto(BigDecimal amount, LocalDateTime dateCreated, String counterpartEmail) {
        this.amount = amount;
        this.dateCreated = dateCreated;
        this.counterpartEmail = counterpartEmail;
    }

    public TransactionDto(Long id) {
        this.id = id;
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

    public boolean isRefunded() {
        return refunded;
    }

    public TransactionType getType() {
        return type;
    }

    public boolean isSender() {
        return isSender;
    }
}
