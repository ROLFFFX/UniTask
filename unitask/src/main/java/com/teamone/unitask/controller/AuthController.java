package com.teamone.unitask.controller;

import com.teamone.unitask.payload.request.RegistrationRequest;
import com.teamone.unitask.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class AuthController {

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
