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
 * Service class for managing User entities.
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


    /**
     * Checks whether a user is a member of a specific project based on the provided JWT token.
     *
     * @param header         The Authorization header containing the JWT token.
     * @param requestProject The project for which membership is checked.
     * @return True if the user is a project member; false otherwise.
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

    /**
     * Extracts the user's email from the JWT token.
     *
     * @param header The Authorization header containing the JWT token.
     * @return User object associated with the provided JWT token.
     * @throws UsernameNotFoundException if the user is not found.
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


    /**
     * Helper method to extract the JWT token from the Authorization header.
     *
     * @param authorizationHeader The Authorization header containing the JWT token.
     * @return Extracted JWT token.
     */
    private String extractTokenFromAuthorizationHeader(String authorizationHeader) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    /**
     * Generates an HTML page with a message and a redirect URL.
     *
     * @param message The message to be displayed on the HTML page.
     * @param url     The URL to which the page will be redirected.
     * @return HTML page as a string.
     */
    public String generateHtmlPage(String message, String url) {
        StringBuilder htmlPage = new StringBuilder();

        htmlPage.append("<!DOCTYPE html>");
        htmlPage.append("<html>");
        htmlPage.append("<head>");
        htmlPage.append("<title>Message Page</title>");
        htmlPage.append("<style>");
        htmlPage.append("h2 { text-align: center; }");
        htmlPage.append("body {");
        htmlPage.append("  display: flex;");
        htmlPage.append("  justify-content: center;");
        htmlPage.append("  align-items: center;");
        htmlPage.append("  height: 100vh;");
        htmlPage.append("  margin: 0;");
        htmlPage.append("  font-family: 'Poppins', sans-serif;");
        htmlPage.append("}");
        htmlPage.append("</style>");
        htmlPage.append("<link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap' rel='stylesheet' />");
        htmlPage.append("<meta http-equiv='refresh' content='3;url=").append(url).append("' />");
        htmlPage.append("</head>");
        htmlPage.append("<body style='display: flex; justify-content: center; align-items: center; height: 80vh;'>");
        htmlPage.append("<h2 style='text-align: center'>").append(message).append("</h2>");
        htmlPage.append("</body>");
        htmlPage.append("</html>");

        return htmlPage.toString();
    }

}
