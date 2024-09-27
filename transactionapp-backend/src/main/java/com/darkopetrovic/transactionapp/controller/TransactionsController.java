package com.darkopetrovic.transactionapp.controller;

import com.darkopetrovic.transactionapp.dto.ErrorResponse;
import com.darkopetrovic.transactionapp.dto.TransactionsWithSender;
import com.darkopetrovic.transactionapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transactions")
public class TransactionsController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionsController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<?> getUserTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size)
    {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<TransactionsWithSender> transactions = transactionService.getUserTransactions(pageable);
            return ResponseEntity.ok(transactions);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new ErrorResponse(ex.getMessage()));
        }
    }
}
