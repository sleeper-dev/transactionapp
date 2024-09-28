package com.darkopetrovic.transactionapp.controller;

import com.darkopetrovic.transactionapp.dto.SendPaymentRequest;
import com.darkopetrovic.transactionapp.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody SendPaymentRequest request) {
            return ResponseEntity.status(200).body(paymentService.validateData(request));
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMoney(@RequestBody SendPaymentRequest request) {
        return ResponseEntity.status(201).body(paymentService.sendPayment(request));
    }
}
