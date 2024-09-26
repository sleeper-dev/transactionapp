package com.darkopetrovic.transactionapp.repository;

import com.darkopetrovic.transactionapp.model.Transaction;
import com.darkopetrovic.transactionapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByReceiverOrderByDateCreatedDesc(User receiver);
    List<Transaction> findTop10ByReceiverOrderByDateCreatedDesc(User receiver);
}
