package com.teamone.unitask.onboard.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


/**
 * The LoginRequest object that works as a wrapper for user login information.
 */
public class LoginRequest {

    /**
     * fields
     */

    /**
     * User's email address for login.
     */
    @NotBlank
    private String email;

    /**
     * User's password for login.
     */
    @NotBlank
    private String password;

    /**
     * methods, getters and setters
     */

    /**
     * Retrieves the email address from the login request.
     *
     * @return The user's email address.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address in the login request.
     *
     * @param email The user's email address.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retrieves the password from the login request.
     *
     * @return The user's password.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password in the login request.
     *
     * @param password The user's password.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
