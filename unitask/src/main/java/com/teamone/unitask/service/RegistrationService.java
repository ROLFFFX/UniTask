package com.teamone.unitask.service;

import com.teamone.unitask.model.RegistrationRequest;
import org.springframework.stereotype.Service;


@Service
public class RegistrationService {
    public String register(RegistrationRequest request) {
        return "it works";
    }
}
