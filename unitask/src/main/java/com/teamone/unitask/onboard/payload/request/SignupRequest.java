package com.teamone.unitask.onboard.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;


/**
 * The SignupRequest object, working as a wrapper for user sign up information.
 */
public class SignupRequest {

    /**
     * fields
     */

    /**
     * User's chosen username for sign up.
     */
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    /**
     * User's email address for sign up.
     */
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    /**
     * Set of roles assigned to the user during sign up.
     */
    private Set<String> role;

    /**
     * User's chosen password for sign up.
     */
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;


    /**
     * getters and setters
     */

    /**
     * Retrieves the chosen username from the sign-up request.
     *
     * @return The user's chosen username.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the chosen username in the sign-up request.
     *
     * @param username The user's chosen username.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retrieves the email address from the sign-up request.
     *
     * @return The user's email address.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address in the sign-up request.
     *
     * @param email The user's email address.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retrieves the set of roles from the sign-up request.
     *
     * @return The set of roles assigned to the user.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the chosen password in the sign-up request.
     *
     * @param password The user's chosen password.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Retrieves the set of roles from the sign-up request.
     *
     * @return The set of roles assigned to the user.
     */
    public Set<String> getRole() {
        return this.role;
    }

    /**
     * Sets the set of roles in the sign-up request.
     *
     * @param role The set of roles assigned to the user.
     */
    public void setRole(Set<String> role) {
        this.role = role;
    }
}
