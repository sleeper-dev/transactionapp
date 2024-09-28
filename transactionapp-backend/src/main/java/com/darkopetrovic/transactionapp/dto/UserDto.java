package com.darkopetrovic.transactionapp.dto;

import java.util.List;

public class UserDto {
    private String firstname;
    private String lastname;
    private String email;
    private double balance;

    private List<TransactionDto> receivedTransactions;

    public UserDto(String firstname, String lastname, String email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public UserDto(String firstname, String lastname, String email, double balance, List<TransactionDto> receivedTransactions) {
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

    public double getBalance() {
        return balance;
    }

    public List<TransactionDto> getReceivedTransactions() {
        return receivedTransactions;
    }
}
