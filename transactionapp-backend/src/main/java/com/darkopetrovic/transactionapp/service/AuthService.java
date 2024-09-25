package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.LoginUserDto;
import com.darkopetrovic.transactionapp.exception.UserNotRegisteredException;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager)
    {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    public User login(LoginUserDto input) throws Exception {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new UserNotRegisteredException("You must register to log in"));

        if(!user.isEnabled()) {
            throw new Exception("Account not verified");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;
    }
}
