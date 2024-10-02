package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.ExchangeRateDto;
import com.darkopetrovic.transactionapp.model.ExchangeRate;
import com.darkopetrovic.transactionapp.repository.ExchangeRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExchangeRateService {

    @Value("${exchange.api.url}")
    private String apiUrl;

    @Value("${exchange.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ExchangeRateRepository exchangeRateRepository;

    @Autowired
    public ExchangeRateService(RestTemplate restTemplate, ExchangeRateRepository exchangeRateRepository) {
        this.restTemplate = restTemplate;
        this.exchangeRateRepository = exchangeRateRepository;
    }

    @Scheduled(fixedRate = 86400000)
    public void updateExchangeRates() {
        fetchAndSaveExchangeRates("EUR");
    }

    public void fetchAndSaveExchangeRates(String baseCurrency) {
        String url = String.format("%s/%s/latest/%s", apiUrl, apiKey, baseCurrency);

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        if (response == null || response.get("conversion_rates") == null) {
            throw new RuntimeException("Failed to fetch exchange rates");
        }

        Map<String, Object> rates = (Map<String, Object>) response.get("conversion_rates");

        exchangeRateRepository.deleteAll();

        rates.forEach((currencyTo, rate) -> {
            ExchangeRate exchangeRate = new ExchangeRate();
            exchangeRate.setCurrencyFrom(baseCurrency);
            exchangeRate.setCurrencyTo(currencyTo);
            exchangeRate.setExchangeRate(Double.parseDouble(rate.toString()));
            exchangeRate.setDateFetched(new java.sql.Timestamp(System.currentTimeMillis()));
            exchangeRateRepository.save(exchangeRate);
        });
    }

    public List<ExchangeRateDto> getExchangeRates(String baseCurrency) {
        List<ExchangeRate> exchangeRates = exchangeRateRepository.findByCurrencyFrom(baseCurrency);

        return exchangeRates.stream()
                .map(rate -> new ExchangeRateDto(
                        rate.getCurrencyFrom(),
                        rate.getCurrencyTo(),
                        rate.getExchangeRate(),
                        rate.getDateFetched()))
                .collect(Collectors.toList());
    }
}
