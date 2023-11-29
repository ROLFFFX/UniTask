package com.teamone.unitask.onboard.confirmationtoken;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.teamone.unitask.onboard.usermodels.User;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * The Confirmation Token entity
 */
@Entity
@Table(name = "confirmation_token")
@NoArgsConstructor
public class ConfirmationToken {

    /**
     * fields
     */

    // confirmation token id, the key of the table;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // UUID generated token, should be unique;
    @Column(nullable = false)
    private String token;

    // object creation time;
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // object expiration time;
    @Column(nullable = false)
    private LocalDateTime expiredAt;

    // user confirmation time;
    private LocalDateTime confirmedAt;

    /**
     * foreign keys
     */

    // user that the current confirmation token belonged;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "user_id")
    @JsonIgnore
    private User user;


    /**
     * methods
     */

    public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiredAt, User user) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }

    public LocalDateTime getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(LocalDateTime confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
