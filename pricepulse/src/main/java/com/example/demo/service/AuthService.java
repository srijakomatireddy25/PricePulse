package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {

        user.setRole("USER");

        return userRepository.save(user);
    }

    public String login(User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent() &&
                existingUser.get().getPassword().equals(user.getPassword())) {

            return "Login Successful";
        }

        return "Invalid Email or Password";
    }

}