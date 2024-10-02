package com.darkopetrovic.transactionapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Timestamp;

@Entity
public class ExchangeRate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String currencyFrom;
    private String currencyTo;
    private Double exchangeRate;
    private Timestamp dateFetched;

    public ExchangeRate() {
    }

    public ExchangeRate(Long id, String currencyFrom, String currencyTo, Double exchangeRate, Timestamp dateFetched) {
        this.id = id;
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;
        this.exchangeRate = exchangeRate;
        this.dateFetched = dateFetched;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrencyFrom() {
        return currencyFrom;
    }

    public void setCurrencyFrom(String currencyFrom) {
        this.currencyFrom = currencyFrom;
    }

    public String getCurrencyTo() {
        return currencyTo;
    }

    public void setCurrencyTo(String currencyTo) {
        this.currencyTo = currencyTo;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Timestamp getDateFetched() {
        return dateFetched;
    }

    public void setDateFetched(Timestamp dateFetched) {
        this.dateFetched = dateFetched;
    }
}
