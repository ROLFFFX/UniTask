package com.teamone.unitask.controller;

import com.teamone.unitask.model.RegistrationRequest;
import com.teamone.unitask.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") //TODO: url to be udpated before deployment
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
