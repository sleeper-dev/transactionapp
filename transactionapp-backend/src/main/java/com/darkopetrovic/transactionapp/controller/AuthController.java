package com.darkopetrovic.transactionapp.controller;


import com.darkopetrovic.transactionapp.dto.JwtDto;
import com.darkopetrovic.transactionapp.dto.LoginUserDto;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.service.AuthService;
import com.darkopetrovic.transactionapp.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final JwtService jwtService;
    private final AuthService authService;

    public AuthController(JwtService jwtService, AuthService authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto loginUserDto) throws Exception {
        User authenticatedUser = authService.login(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        JwtDto loginResponse = new JwtDto(jwtToken, jwtService.getExpiration());

        return ResponseEntity.ok(loginResponse);
    }
}
