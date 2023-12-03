package com.teamone.unitask.onboard.confirmationtoken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repository interface for Confirmation Token entities.
 */
@Repository
@Transactional(readOnly = true)
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {

    /**
     * Find the token object by the token field.
     *
     * @param token The token to search for.
     * @return An Optional containing the ConfirmationToken if found, otherwise empty.
     */
    Optional<ConfirmationToken> findByToken(String token);

    /**
     * Update the confirmation time.
     *
     * @param token        The token for which to update the confirmation time.
     * @param confirmedAt  The new confirmation time.
     * @return The number of affected rows in the database.
     */
    @Transactional
    @Modifying
    @Query("UPDATE ConfirmationToken c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);

}
