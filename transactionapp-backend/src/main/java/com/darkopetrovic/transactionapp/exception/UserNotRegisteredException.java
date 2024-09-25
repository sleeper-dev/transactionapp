package com.darkopetrovic.transactionapp.exception;

public class UserNotRegisteredException extends RuntimeException{

    public UserNotRegisteredException(String message) {
        super(message);
    }
}
