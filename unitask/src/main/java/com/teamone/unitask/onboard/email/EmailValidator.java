package com.teamone.unitask.onboard.email;


import org.springframework.stereotype.Service;

import java.util.function.Predicate;


/**
 * email validator class
 */
@Service
public class EmailValidator implements Predicate<String> {

    @Override
    public boolean test(String s) {
        return true;
    }
}
