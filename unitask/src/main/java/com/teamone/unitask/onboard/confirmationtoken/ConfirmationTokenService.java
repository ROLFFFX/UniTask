package com.teamone.unitask.onboard.confirmationtoken;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Service class for the ConfirmationToken entity.
 */
@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    /**
     * Save a ConfirmationToken to the database.
     *
     * @param token The ConfirmationToken to be saved.
     */
    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    /**
     * Get a ConfirmationToken from the database by the token string.
     *
     * @param token The token string to search for.
     * @return An Optional containing the ConfirmationToken if found, otherwise empty.
     */
    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    /**
     * Set the user confirmation time for a given token.
     *
     * @param token The token for which to set the confirmation time.
     * @return The number of affected rows in the database.
     */
    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
    }

}
