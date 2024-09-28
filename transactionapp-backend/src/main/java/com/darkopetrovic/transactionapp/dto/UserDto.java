package com.darkopetrovic.transactionapp.dto;

import java.math.BigDecimal;
import java.util.List;

public class UserDto {
    private String firstname;
    private String lastname;
    private String email;
    private BigDecimal balance;

    private List<TransactionDto> receivedTransactions;

    public UserDto(String firstname, String lastname, String email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public UserDto(String firstname, String lastname, String email, BigDecimal balance, List<TransactionDto> receivedTransactions) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.balance = balance;
        this.receivedTransactions = receivedTransactions;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public List<TransactionDto> getReceivedTransactions() {
        return receivedTransactions;
    }
}
