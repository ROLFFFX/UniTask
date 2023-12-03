package com.teamone.unitask.onboard.email;


import org.springframework.stereotype.Service;

import java.util.function.Predicate;


/**
 * EmailValidator class that implements the Predicate interface.
 */
@Service
public class EmailValidator implements Predicate<String> {

    /**
     * Tests if the given email address is valid.
     *
     * @param s The email address to be validated.
     * @return true if the email is valid, false otherwise.
     */
    @Override
    public boolean test(String s) {

        // Implement email validation logic here
        // For now, it returns true
        return true;
    }
}
