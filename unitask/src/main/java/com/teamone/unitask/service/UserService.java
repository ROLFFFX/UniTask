package com.teamone.unitask.service;

import com.teamone.unitask.model.User;
import com.teamone.unitask.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    public List<User> getAllUser {
//        return userRepository.findAll();
//    }
}
