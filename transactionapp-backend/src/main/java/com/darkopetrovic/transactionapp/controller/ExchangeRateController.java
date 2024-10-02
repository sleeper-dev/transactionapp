package com.darkopetrovic.transactionapp.controller;

import com.darkopetrovic.transactionapp.service.ExchangeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/exchange-rates")
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    @Autowired
    public ExchangeRateController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

    @PostMapping("/fetch")
    public ResponseEntity<?> fetchExchangeRates() {
        try {
            exchangeRateService.fetchAndSaveExchangeRates("EUR");
            return ResponseEntity.ok("Exchange rates for EUR fetched and saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getExchangeRates() {
        return ResponseEntity.ok(exchangeRateService.getExchangeRates("EUR"));
    }
}

