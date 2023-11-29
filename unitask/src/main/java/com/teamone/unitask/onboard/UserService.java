package com.teamone.unitask.onboard;

import com.teamone.unitask.onboard.confirmationtoken.ConfirmationTokenService;
import com.teamone.unitask.onboard.email.EmailService;
import com.teamone.unitask.onboard.email.EmailValidator;
import com.teamone.unitask.onboard.security.jwt.JwtUtils;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.RoleRepository;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * The service class for the User entity
 */
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    EmailValidator emailValidator;

    @Autowired
    EmailService emailService;

    @Autowired
    ConfirmationTokenService confirmationTokenService;

    @Autowired
    ProjectRepository projectRepository;


    /*
     * method to detect whether a user is a project member of certain project given the jwt token;
     */
    public Boolean isProjectMember(String header, Project requestProject) {

        User thisUser = getUserEmailFromToken(header);

        List<User> allUserInProject = userRepository.findUserByProjects(requestProject);

        Boolean ifExisted = false;
        for (User eUser: allUserInProject) {
            if (eUser.getId().equals(thisUser.getId())) {
                ifExisted = true;
            }
        }

        return ifExisted;
    }

    /*
     * Extract user email from the JWT;
     */
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


    /*
     * helper method of getUserEmailFromToken;
     */
    private String extractTokenFromAuthorizationHeader(String authorizationHeader) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

}
