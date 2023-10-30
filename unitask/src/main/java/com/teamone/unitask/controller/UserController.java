package com.teamone.unitask.controller;

import com.teamone.unitask.model.User;
import com.teamone.unitask.repository.UserRepository;
import com.teamone.unitask.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//1017
//import org.springframework.http.ResponseEntity;
//import java.util.Optional;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

}
