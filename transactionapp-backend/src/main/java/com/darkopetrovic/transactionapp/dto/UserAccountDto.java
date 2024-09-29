package com.darkopetrovic.transactionapp.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class UserAccountDto {
    private String firstname;
    private String lastname;
    private String email;
    private LocalDateTime dateCreated;
    private Map<String, Object> address;

    public UserAccountDto(String firstname, String lastname, String email, LocalDateTime dateCreated, Map<String, Object> address) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dateCreated = dateCreated;
        this.address = address;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Map<String, Object> getAddress() {
        return address;
    }

    public void setAddress(Map<String, Object> address) {
        this.address = address;
    }
}
