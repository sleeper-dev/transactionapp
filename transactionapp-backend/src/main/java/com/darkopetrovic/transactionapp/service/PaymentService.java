package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.SendPaymentRequest;
import com.darkopetrovic.transactionapp.dto.TransactionDto;
import com.darkopetrovic.transactionapp.exception.InsufficientFundsException;
import com.darkopetrovic.transactionapp.exception.NotFoundException;
import com.darkopetrovic.transactionapp.model.Transaction;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.TransactionRepository;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import com.darkopetrovic.transactionapp.utils.TransactionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Autowired
    public PaymentService(TransactionRepository transactionRepository, UserRepository userRepository, NotificationService notificationService) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public SendPaymentRequest validateData(SendPaymentRequest request) {
        User recipient = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String senderEmail = authentication.getName();
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new NotFoundException("Sender not found"));

        if (sender.getEmail().equals(recipient.getEmail())) {
            throw new IllegalArgumentException("You cannot send money to yourself");
        }

        if (sender.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientFundsException("Insufficient funds");
        }

        return request;
    }

    @Transactional
    public TransactionDto sendPayment(SendPaymentRequest request) {
        User recipient = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String senderEmail = authentication.getName();
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new NotFoundException("Sender not found"));

        if (sender.getEmail().equals(recipient.getEmail())) {
            throw new IllegalArgumentException("You cannot send money to yourself");
        }

        if (sender.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientFundsException("Insufficient funds");
        }

        Transaction transaction = new Transaction();
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setSender(sender);
        transaction.setReceiver(recipient);
        transaction.setRefunded(false);
        transaction.setType(TransactionType.PAYMENT);
        transaction.setDateCreated(LocalDateTime.now());

        Transaction savedTransaction = transactionRepository.save(transaction);

        sender.setBalance(sender.getBalance().subtract(request.getAmount()));
        recipient.setBalance(recipient.getBalance().add(request.getAmount()));

        userRepository.save(sender);
        userRepository.save(recipient);

        notificationService.createNotification("You received " + transaction.getAmount() + " from " + transaction.getSender().getEmail(), transaction.getReceiver());

        return new TransactionDto(savedTransaction.getId());
    }
}
