package com.darkopetrovic.transactionapp.model;

import jakarta.persistence.*;

@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String street;
    private String city;
    private String postalCode;
    private String country;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Address() {
    }

    public Address(Long id, String street, String city, String postalCode, String country, User user) {
        this.id = id;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
