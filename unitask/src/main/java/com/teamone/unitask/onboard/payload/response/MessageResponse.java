package com.teamone.unitask.onboard.payload.response;


/**
 * The MessageResponse object works as a wrapper for the return message, mainly used with the ResponseEntity.
 * The class has only a message field, and methods include the constructor, getter, and the setter.
 */
public class MessageResponse {

    /**
     * Message to be returned.
     */
    private String message;

    /**
     * Constructor for MessageResponse.
     *
     * @param message The message to be returned.
     */
    public MessageResponse(String message) {
        this.message = message;
    }

    /**
     * Retrieves the message.
     *
     * @return The message.
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message.
     *
     * @param message The message to be set.
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
