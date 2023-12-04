package com.teamone.unitask.onboard.payload.response;

import java.util.List;


/**
 * The JwtResponse object, working as a wrapper for the return fields when the user is signed in.
 * This object includes fields: generated JWT, JWT type, user id, username, user email, and user roles.
 */
public class JwtResponse {

    /**
     * fields
     */

    /**
     * JWT token generated for the user.
     */
    private String token;

    /**
     * Type of the JWT token.
     */
    private String type = "Bearer";

    /**
     * User's unique identifier.
     */
    private Long id;

    /**
     * User's chosen username.
     */
    private String username;

    /**
     * User's email address.
     */
    private String email;

    /**
     * List of roles assigned to the user.
     */
    private List<String> roles;

    /**
     * constructor, getters and setters
     */

    /**
     * Constructor for JwtResponse.
     *
     * @param accessToken Generated JWT token for the user.
     * @param id          User's unique identifier.
     * @param username    User's chosen username.
     * @param email       User's email address.
     * @param roles       List of roles assigned to the user.
     */
    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    /**
     * Retrieves the JWT token.
     *
     * @return The JWT token.
     */
    public String getAccessToken() {
        return token;
    }

    /**
     * Sets the JWT token.
     *
     * @param accessToken The JWT token.
     */
    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    /**
     * Retrieves the type of the JWT token.
     *
     * @return The type of the JWT token.
     */
    public String getTokenType() {
        return type;
    }

    /**
     * Sets the type of the JWT token.
     *
     * @param tokenType The type of the JWT token.
     */
    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    /**
     * Retrieves the user's unique identifier.
     *
     * @return The user's unique identifier.
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the user's unique identifier.
     *
     * @param id The user's unique identifier.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retrieves the user's email address.
     *
     * @return The user's email address.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the user's email address.
     *
     * @param email The user's email address.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retrieves the user's chosen username.
     *
     * @return The user's chosen username.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the user's chosen username.
     *
     * @param username The user's chosen username.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retrieves the list of roles assigned to the user.
     *
     * @return The list of roles assigned to the user.
     */
    public List<String> getRoles() {
        return roles;
    }
}
