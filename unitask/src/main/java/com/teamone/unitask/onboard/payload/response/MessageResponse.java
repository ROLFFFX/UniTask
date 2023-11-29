package com.teamone.unitask.onboard.payload.response;


/**
 * The MessageResponse object works as a wrapper for the return message, mainly used with the ResponseEntity;
 * the class has only a message field, and methods include the constructor, getter, and the setter
 */
public class MessageResponse {

    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
