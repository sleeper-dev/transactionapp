package com.darkopetrovic.transactionapp.repository;

import com.darkopetrovic.transactionapp.model.Transaction;
import com.darkopetrovic.transactionapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findTop10ByReceiverOrderByDateCreatedDesc(User receiver);
    Page<Transaction> findByReceiverOrSender(User receiver, User sender, Pageable pageable);
    Page<Transaction> findBySender(User sender, Pageable pageable);
    Page<Transaction> findByReceiver(User receiver, Pageable pageable);
}
