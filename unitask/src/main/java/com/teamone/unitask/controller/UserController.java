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

    // get a single user object from front end and store in the database unitask-user;
//    @PostMapping("/postUser")
//    User postNewUser(@RequestBody User newUser) {
//        return userRepository.save(newUser);
//    }

    //
//    @GetMapping("/getAllUsers")
//    List<User> getAllUsers() {
//
//    }
//
//    @PostMapping("/postUserSignup")
//    User postUserSignup(@RequestBody User newUser) {
//        return userRepository.save(newUser);
//    }

//    @GetMapping("/collectLogin")
//    List<String> getLoginInfo()

//    @PostMapping("/verifyUserSignin")
//    ResponseEntity<String> verifyUserSignin(@RequestBody User user) {
//        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
//
//        if(foundUser.isPresent()){
//            if(foundUser.get().getPassword().equals(user.getPassword())){
//                return ResponseEntity.ok("User successfully logged in");
//            }
//            else{
//                return ResponseEntity.status(403).body("Invalid password");
//            }
//        }
//        else{
//            return ResponseEntity.status(404).body("User not found");
//        }R
//    }
    //

    // forget password (tbd)
}
