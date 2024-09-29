package com.darkopetrovic.transactionapp.service;

import com.darkopetrovic.transactionapp.dto.AddressDto;
import com.darkopetrovic.transactionapp.dto.TransactionDto;
import com.darkopetrovic.transactionapp.dto.UserAccountDto;
import com.darkopetrovic.transactionapp.dto.UserDto;
import com.darkopetrovic.transactionapp.exception.NotFoundException;
import com.darkopetrovic.transactionapp.exception.UserAlreadyExistsException;
import com.darkopetrovic.transactionapp.model.Address;
import com.darkopetrovic.transactionapp.model.Transaction;
import com.darkopetrovic.transactionapp.model.User;
import com.darkopetrovic.transactionapp.repository.AddressRepository;
import com.darkopetrovic.transactionapp.repository.TransactionRepository;
import com.darkopetrovic.transactionapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TransactionRepository transactionRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository, AddressRepository addressRepository, BCryptPasswordEncoder bCryptPasswordEncoder, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public void createUser(User user) throws UserAlreadyExistsException {
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with this email already exists!");

        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User newUser = userRepository.save(user);

        Address emptyAddress = new Address();
        emptyAddress.setUser(newUser);
        addressRepository.save(emptyAddress);
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

    public UserAccountDto getUserAccountInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Address address = user.getAddress();

        Map<String, Object> addressInfo = new HashMap<>();

        if (address != null) {
            addressInfo.put("street", address.getStreet());
            addressInfo.put("city", address.getCity());
            addressInfo.put("country", address.getCountry());
            addressInfo.put("postalCode", address.getPostalCode());
        }

        return new UserAccountDto(
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getDateCreated(),
                addressInfo);
    }

    public AddressDto updateAddress(AddressDto addressDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Address address = addressRepository.findByUserEmail(email)
                .orElseThrow(() -> new NotFoundException("Address not found"));

        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setCountry(addressDto.getCountry());
        address.setPostalCode(addressDto.getPostalCode());

        Address updatedAddress = addressRepository.save(address);

        return new AddressDto(updatedAddress.getStreet(), updatedAddress.getCity(), updatedAddress.getCountry(), updatedAddress.getPostalCode());
    }
}
