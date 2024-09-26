package com.darkopetrovic.transactionapp.controller;


import com.darkopetrovic.transactionapp.dto.JwtDto;
import com.darkopetrovic.transactionapp.dto.LoginUserDto;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.service.AuthService;
import com.darkopetrovic.transactionapp.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final JwtService jwtService;
    private final AuthService authService;
    private final UserDetailsService userDetailsService;

    public AuthController(JwtService jwtService, AuthService authService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.authService = authService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto loginUserDto) throws Exception {
        User authenticatedUser = authService.login(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        JwtDto loginResponse = new JwtDto(jwtToken, jwtService.getExpiration());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        String email = jwtService.extractEmail(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        if (jwtService.isTokenValid(token, userDetails)) {
            return ResponseEntity.ok("Valid token");
        } else {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}
