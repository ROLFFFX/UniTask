package com.teamone.unitask.onboard.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


/**
 * The LoginRequest object that works as a wrapper for user login information
 */
public class LoginRequest {

    @NotBlank
    private String email;
    @NotBlank
    private String password;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
