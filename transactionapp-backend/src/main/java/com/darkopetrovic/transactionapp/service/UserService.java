package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.TransactionDto;
import com.darkopetrovic.transactionapp.dto.UserDto;
import com.darkopetrovic.transactionapp.exception.UserAlreadyExistsException;
import com.darkopetrovic.transactionapp.model.Transaction;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.TransactionRepository;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TransactionRepository transactionRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public void createUser(User user) throws UserAlreadyExistsException {
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with this email already exists!");

        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDto getUserWithTransactions() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new Exception("User not found"));

        List<Transaction> receivedTransactions = transactionRepository.findTop10ByReceiverOrderByDateCreatedDesc(user);

        List<TransactionDto> transactionDtos = receivedTransactions.stream()
                .map(transaction -> new TransactionDto(
                        transaction.getAmount(),
                        transaction.getDateCreated(),
                        transaction.getSender().getEmail()
                ))
                .toList();

        LOGGER.info(String.valueOf(receivedTransactions.size()));

        return new UserDto(user.getFirstname(), user.getLastname(), user.getEmail(), user.getBalance(), transactionDtos);
    }
}
