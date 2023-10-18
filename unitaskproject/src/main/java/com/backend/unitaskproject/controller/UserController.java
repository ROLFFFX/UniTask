package com.backend.unitaskproject.controller;

import com.backend.unitaskproject.entity.User;
import com.backend.unitaskproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public User addUser(@RequestBody User newRegisteredUser) {
        return userRepository.save(newRegisteredUser);
    }

    @GetMapping("/getAllUser")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
