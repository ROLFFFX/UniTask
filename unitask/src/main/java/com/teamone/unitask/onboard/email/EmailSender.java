package com.teamone.unitask.onboard.email;

/**
 * Interface for sending emails.
 */
public interface EmailSender {

    /**
     * Sends an email.
     *
     * @param to    The recipient's email address.
     * @param email The email content.
     */
    void send(String to, String email);
}
