package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.exception.UserAlreadyExistsException;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Transactional
    public void createUser(User user) throws UserAlreadyExistsException {
        if(userRepository.findByEmail(user.getEmail()) != null) {
            throw new UserAlreadyExistsException("User with this email already exists!");

        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
