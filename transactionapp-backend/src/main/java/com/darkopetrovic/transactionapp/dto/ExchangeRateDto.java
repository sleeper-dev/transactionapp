package com.darkopetrovic.transactionapp.dto;

import java.sql.Timestamp;

public class ExchangeRateDto {
    private String currencyFrom;
    private String currencyTo;
    private Double exchangeRate;
    private Timestamp dateFetched;

    public ExchangeRateDto(String currencyFrom, String currencyTo, Double exchangeRate, Timestamp dateFetched) {
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;
        this.exchangeRate = exchangeRate;
        this.dateFetched = dateFetched;
    }

    public String getCurrencyFrom() {
        return currencyFrom;
    }

    public String getCurrencyTo() {
        return currencyTo;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public Timestamp getDateFetched() {
        return dateFetched;
    }
}
