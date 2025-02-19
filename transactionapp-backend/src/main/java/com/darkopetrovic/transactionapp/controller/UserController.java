package com.darkopetrovic.transactionapp.controller;

import com.darkopetrovic.transactionapp.dto.AddressDto;
import com.darkopetrovic.transactionapp.dto.ErrorResponse;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        LOGGER.info("User: {}", user.toString());
        userService.createUser(user);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> userDetails() {
        try {
            return ResponseEntity.ok(userService.getUserWithTransactions());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new ErrorResponse(ex.getMessage()));
        }
    }

    @GetMapping("/account")
    public ResponseEntity<?> accountDetails() {
        try {
            return ResponseEntity.ok(userService.getUserAccountInfo());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new ErrorResponse(ex.getMessage()));
        }
    }

    @PutMapping("/update-address")
    public ResponseEntity<?> updateAddress(@RequestBody AddressDto addressDto) {
        try {
            return ResponseEntity.ok(userService.updateAddress(addressDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new ErrorResponse(ex.getMessage()));
        }
    }
}
