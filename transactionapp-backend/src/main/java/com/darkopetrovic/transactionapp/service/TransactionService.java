package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.TransactionsWithSender;
import com.darkopetrovic.transactionapp.model.Transaction;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.TransactionRepository;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public Page<TransactionsWithSender> getUserTransactions(Pageable pageable, String sortBy) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String[] sortParams = sortBy.split("-");
        String sortField = sortParams[0];
        Sort.Direction sortDirection = sortParams.length > 1 && "asc".equalsIgnoreCase(sortParams[1]) ? Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(sortDirection, sortField));

        Page<Transaction> transactions = transactionRepository.findByReceiverOrSender(user, user, sortedPageable);

        return transactions.map(transaction -> {
            boolean isSender = transaction.getSender().equals(user);
            User partner = isSender ? transaction.getReceiver() : transaction.getSender();
            return new TransactionsWithSender(
                    transaction.getAmount(),
                    transaction.getDateCreated(),
                    partner.getEmail(),
                    partner.getFirstname(),
                    partner.getLastname(),
                    isSender);
        });
    }
}
