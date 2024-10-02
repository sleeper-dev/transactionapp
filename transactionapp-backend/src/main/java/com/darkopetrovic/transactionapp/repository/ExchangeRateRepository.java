package com.darkopetrovic.transactionapp.repository;

import com.darkopetrovic.transactionapp.model.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {
    List<ExchangeRate> findByCurrencyFrom(String currencyFrom);
}
