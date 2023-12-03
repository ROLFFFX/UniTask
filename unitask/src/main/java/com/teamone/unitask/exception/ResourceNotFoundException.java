package com.teamone.unitask.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Resource Not Found Exception.
 * Extends RuntimeException and is used to capture cases where the requested object does not exist.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    /**
     * Constructor for ResourceNotFoundException.
     *
     * @param message A message describing the exception.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
