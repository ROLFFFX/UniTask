package com.teamone.unitask.onboard.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.teamone.unitask.onboard.usermodels.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


/**
 * Implementation of the UserDetails interface for user information in the Spring Security context.
 */
public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    // User ID
    private Long id;

    // User's username
    private String username;

    // User's email address
    private String email;

    // User's password (ignored during serialization)
    @JsonIgnore
    private String password;

    // Collection of authorities assigned to the user
    private Collection<? extends GrantedAuthority> authorities;

    /**
     * Constructor to create a UserDetailsImpl object.
     *
     * @param id           The user ID.
     * @param username     The username.
     * @param email        The user's email address.
     * @param password     The user's password (ignored during serialization).
     * @param authorities  The collection of authorities assigned to the user.
     */
    public UserDetailsImpl(Long id, String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    /**
     * Build a UserDetailsImpl object by converting the input User object into the UserDetailsImpl format.
     *
     * @param user The User object to be converted.
     * @return A UserDetailsImpl object.
     */
    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    /**
     * Get the user ID.
     *
     * @return The user ID.
     */
    public Long getId() {
        return id;
    }

    /**
     * Get the user's email address.
     *
     * @return The user's email address.
     */
    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
