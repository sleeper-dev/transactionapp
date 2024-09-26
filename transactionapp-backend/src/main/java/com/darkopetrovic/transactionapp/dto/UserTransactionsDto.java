package com.darkopetrovic.transactionapp.dto;

import java.util.List;

public class UserTransactionsDto {
    private String firstName;
    private String lastName;
    private String email;

    private double balance;

    private List<TransactionDto> receivedTransactions;

    public UserTransactionsDto(String firstName, String lastName, String email, double balance, List<TransactionDto> receivedTransactions) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.receivedTransactions = receivedTransactions;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
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
