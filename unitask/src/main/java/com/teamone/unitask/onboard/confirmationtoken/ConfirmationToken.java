package com.teamone.unitask.onboard.confirmationtoken;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.teamone.unitask.onboard.usermodels.User;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity class for Confirmation Token.
 */
@Entity
@Table(name = "confirmation_token")
@NoArgsConstructor
public class ConfirmationToken {

    /**
     * fields
     */

    // Confirmation token id, the key of the table.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // UUID generated token, should be unique.
    @Column(nullable = false)
    private String token;

    // Object creation time.
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Object expiration time.
    @Column(nullable = false)
    private LocalDateTime expiredAt;

    // User confirmation time.
    private LocalDateTime confirmedAt;

    /**
     * foreign keys
     */

    // User that the current confirmation token belongs to.
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "user_id")
    @JsonIgnore
    private User user;


    /**
     * methods
     */

    /**
     * Constructor for ConfirmationToken.
     *
     * @param token     UUID generated token.
     * @param createdAt Object creation time.
     * @param expiredAt Object expiration time.
     * @param user      User associated with the confirmation token.
     */
    public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiredAt, User user) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.user = user;
    }

    /**
     * Getter for Id.
     *
     * @return The confirmation token id.
     */
    public Long getId() {
        return id;
    }

    /**
     * Getter for Token.
     *
     * @return The UUID generated token.
     */
    public String getToken() {
        return token;
    }

    /**
     * Setter for Token.
     *
     * @param token The UUID generated token to set.
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * Getter for CreatedAt.
     *
     * @return The object creation time.
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Setter for CreatedAt.
     *
     * @param createdAt The object creation time to set.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * Getter for ExpiredAt.
     *
     * @return The object expiration time.
     */
    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    /**
     * Setter for ExpiredAt.
     *
     * @param expiredAt The object expiration time to set.
     */
    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }

    /**
     * Getter for ConfirmedAt.
     *
     * @return The user confirmation time.
     */
    public LocalDateTime getConfirmedAt() {
        return confirmedAt;
    }

    /**
     * Setter for ConfirmedAt.
     *
     * @param confirmedAt The user confirmation time to set.
     */
    public void setConfirmedAt(LocalDateTime confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    /**
     * Getter for User.
     *
     * @return The user associated with the confirmation token.
     */
    public User getUser() {
        return user;
    }

    /**
     * Setter for User.
     *
     * @param user The user to set for the confirmation token.
     */
    public void setUser(User user) {
        this.user = user;
    }
}
