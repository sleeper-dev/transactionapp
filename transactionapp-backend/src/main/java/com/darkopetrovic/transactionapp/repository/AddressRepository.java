package com.darkopetrovic.transactionapp.repository;

import com.darkopetrovic.transactionapp.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByUserEmail(String email);
}

