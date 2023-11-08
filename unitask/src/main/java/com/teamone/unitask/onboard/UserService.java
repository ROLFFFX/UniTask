package com.teamone.unitask.onboard;

import com.teamone.unitask.onboard.security.jwt.JwtUtils;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    public User getUserEmailFromToken(String header) {
        String jwtToken = extractTokenFromAuthorizationHeader(header);
        String email = jwtUtils.getUserNameFromJwtToken(jwtToken);
        User user = userRepository.getByEmail(email);
        if (user != null) {
            return user;
        } else {
            //TODO: need to test the error output;
            throw new UsernameNotFoundException("Cannot find the user" + email);
        }
    }

    private String extractTokenFromAuthorizationHeader(String authorizationHeader) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
