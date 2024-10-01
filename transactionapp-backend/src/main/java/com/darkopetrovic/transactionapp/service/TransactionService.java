package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.TransactionDto;
import com.darkopetrovic.transactionapp.exception.InsufficientFundsException;
import com.darkopetrovic.transactionapp.exception.NotFoundException;
import com.darkopetrovic.transactionapp.exception.RefundPeriodExpiredException;
import com.darkopetrovic.transactionapp.model.Transaction;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.TransactionRepository;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import com.darkopetrovic.transactionapp.utils.TransactionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    private static final int REFUND_PERIOD_DAYS = 15;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository, NotificationService notificationService) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public Page<TransactionDto> getUserTransactions(Pageable pageable, String sortBy, String filter) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String[] sortParams = sortBy.split("-");
        String sortField = sortParams[0];
        Sort.Direction sortDirection = sortParams.length > 1 && "asc".equalsIgnoreCase(sortParams[1]) ? Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(sortDirection, sortField));

        Page<Transaction> transactions;

        if ("sent".equalsIgnoreCase(filter)) {
            transactions = transactionRepository.findBySender(user, sortedPageable);
        } else if ("received".equalsIgnoreCase(filter)) {
            transactions = transactionRepository.findByReceiver(user, sortedPageable);
        } else {
            transactions = transactionRepository.findByReceiverOrSender(user, user, sortedPageable);
        }

        return transactions.map(transaction -> {
            boolean isSender = transaction.getSender().equals(user);
            User partner = isSender ? transaction.getReceiver() : transaction.getSender();
            return new TransactionDto(
                    transaction.getId(),
                    transaction.getAmount(),
                    transaction.getDateCreated(),
                    partner.getEmail(),
                    partner.getFirstname(),
                    partner.getLastname(),
                    transaction.isRefunded(),
                    transaction.getType(),
                    isSender);
        });
    }

    public TransactionDto getTransactionById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Transaction not found"));

        if (!transaction.getSender().equals(user) && !transaction.getReceiver().equals(user)) {
            throw new NotFoundException("Transaction not found");
        }

        boolean isSender = transaction.getSender().equals(user);
        User partner = isSender ? transaction.getReceiver() : transaction.getSender();

        return new TransactionDto(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getDateCreated(),
                transaction.getDescription(),
                partner.getEmail(),
                partner.getFirstname(),
                partner.getLastname(),
                transaction.isRefunded(),
                transaction.getType(),
                isSender
        );
    }

    public TransactionDto refundTransaction(Long transactionId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new NotFoundException("Transaction not found"));

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!transaction.getSender().equals(currentUser)) {
            throw new AccessDeniedException("Only the sender of the transaction can request a refund.");
        }

        if (transaction.isRefunded()) {
            throw new IllegalStateException("Transaction has already been refunded.");
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime transactionDate = transaction.getDateCreated();

        long daysBetween = ChronoUnit.DAYS.between(transactionDate, now);
        if (daysBetween > REFUND_PERIOD_DAYS) {
            throw new RefundPeriodExpiredException("Refund period expired. Refund is not allowed after 15 days.");
        }

        User receiver = transaction.getReceiver();
        User sender = transaction.getSender();

        if (receiver.getBalance().compareTo(transaction.getAmount()) < 0) {
            throw new InsufficientFundsException("Insufficient funds for refund");
        }

        receiver.setBalance(receiver.getBalance().subtract(transaction.getAmount()));
        userRepository.save(receiver);

        sender.setBalance(sender.getBalance().add(transaction.getAmount()));
        userRepository.save(sender);

        transaction.setRefunded(true);
        transactionRepository.save(transaction);

        Transaction refundTransaction = new Transaction();
        refundTransaction.setAmount(transaction.getAmount());
        refundTransaction.setSender(transaction.getReceiver());
        refundTransaction.setReceiver(transaction.getSender());
        refundTransaction.setDescription("Refund for transaction #" + transaction.getId());
        refundTransaction.setType(TransactionType.REFUND);
        refundTransaction.setDateCreated(LocalDateTime.now());

        Transaction refunded = transactionRepository.save(refundTransaction);

        notificationService.createNotification("Your account has been debited by "+transaction.getAmount()+" due to a refund for transaction ID " + transaction.getId(), receiver);

        return new TransactionDto(refunded.getId());
    }
}
