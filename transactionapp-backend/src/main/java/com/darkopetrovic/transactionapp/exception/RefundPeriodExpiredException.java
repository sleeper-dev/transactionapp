package com.darkopetrovic.transactionapp.exception;

public class RefundPeriodExpiredException extends RuntimeException {
    public RefundPeriodExpiredException(String message) {
        super(message);
    }
}
