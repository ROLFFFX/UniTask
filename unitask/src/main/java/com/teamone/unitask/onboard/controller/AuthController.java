package com.teamone.unitask.onboard.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.onboard.UserService;
import com.teamone.unitask.onboard.confirmationtoken.ConfirmationTokenService;
import com.teamone.unitask.onboard.email.EmailService;
import com.teamone.unitask.onboard.confirmationtoken.ConfirmationToken;
import com.teamone.unitask.onboard.usermodels.ERole;
import com.teamone.unitask.onboard.usermodels.Role;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.payload.request.LoginRequest;
import com.teamone.unitask.onboard.payload.request.SignupRequest;
import com.teamone.unitask.onboard.payload.response.JwtResponse;
import com.teamone.unitask.onboard.payload.response.MessageResponse;
import com.teamone.unitask.onboard.userrepos.RoleRepository;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import com.teamone.unitask.onboard.security.jwt.JwtUtils;
import com.teamone.unitask.onboard.security.services.UserDetailsImpl;
import com.teamone.unitask.onboard.email.EmailValidator;
import com.teamone.unitask.projects.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


/**
 * Controller class for the signup/login page.
 */
//@CrossOrigin(origins = "", maxAge = 3600)
@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailValidator emailValidator;

    @Autowired
    EmailService emailService;

    @Autowired
    ConfirmationTokenService confirmationTokenService;

    @Autowired
    UserService userService;


    /**
     * The sign-in method to verify the user by the email - password pair and generate JWT using the user's email, then
     * return user id, username, user email, the JWT, and user roles, all wrapped in a JwtResponse object.
     *
     * @param loginRequest The login request containing user email and password.
     * @return ResponseEntity containing JwtResponse or an error message.
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // if user already signed up and have confirmed the user's email, return error message;
        if (userRepository.existsByEmail(loginRequest.getEmail()) &&
                !userRepository.getByEmail(loginRequest.getEmail()).isEnabled()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User need to re-register."));
        }

        // verify user and generate JWT;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        // get user information and roles;
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // return user id, username, user email, the JWT, and user roles, all wrapped in a JwtResponse object;
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    /**
     * The sign-up method that stores user information.
     *
     * @param signUpRequest The signup request containing user details.
     * @return ResponseEntity containing a success message or an error message.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        // check if user previously registered but not confirmed email address;
        if (!(userRepository.existsByEmail(signUpRequest.getEmail()) &&
                !userRepository.getByEmail(signUpRequest.getEmail()).isEnabled())) {
            // check if duplicate username;
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
            }
            // check if duplicate email;
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
            }
            // check if valid email;
            boolean isValidEmail = emailValidator.test(signUpRequest.getEmail());
            if (!isValidEmail) {
                return ResponseEntity.badRequest().body((new MessageResponse("Error: Email not valid!")));
            }

            // Create new user's account
            User user = new User(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()));

            Set<String> strRoles = signUpRequest.getRole();
            Set<Role> roles = new HashSet<>();
            //strRoles == null
            if (strRoles.isEmpty()) {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found empty."));
                roles.add(userRole);
            } else {
                //TODO: fix default;
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found admin."));
                            roles.add(adminRole);

                            break;
                        case "mod":
                            Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found mod."));
                            roles.add(modRole);

                            break;
                        default:
                            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found default."));
                            roles.add(userRole);
                    }
                });
            }
            user.setRoles(roles);
            userRepository.save(user);

            // generate register token;
            String signupToken = UUID.randomUUID().toString();
            // save token;
            ConfirmationToken confirmationToken = new ConfirmationToken(
                    signupToken,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    user
            );
            confirmationTokenService.saveConfirmationToken(confirmationToken);
            // create email link and send email;
            //TODO: need to modify when deploy;
            String link = "https://unitask-backend-impl-72c59f313288.herokuapp.com/api/auth/confirmSignUp?token=" + signupToken;
            emailService.send(signUpRequest.getEmail(),
                    emailService.buildEmail(signUpRequest.getUsername(), link));

            // return generated token;
            return ResponseEntity.ok(new MessageResponse("Email sent!"));
        } else {
            User user = userRepository.getByEmail(signUpRequest.getEmail());

            // update user info
            user.setPassword(encoder.encode(signUpRequest.getPassword()));
            user.setUsername(signUpRequest.getUsername());

            userRepository.save(user);

            // generate register token;
            String signupToken = UUID.randomUUID().toString();
            // save token;
            ConfirmationToken confirmationToken = new ConfirmationToken(
                    signupToken,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    user
            );
            confirmationTokenService.saveConfirmationToken(confirmationToken);
            // create email link and send email;
            //TODO: need to modify when deploy;
            String link = "https://unitask-backend-impl-72c59f313288.herokuapp.com/api/auth/confirmSignUp?token=" + signupToken;
            emailService.send(signUpRequest.getEmail(),
                    emailService.buildEmail(signUpRequest.getUsername(), link));

            // return generated token;
            return ResponseEntity.ok(new MessageResponse("Email sent again!"));
        }
    }

    /**
     * Method to confirm the user's email address and enable the user.
     *
     * @param token The confirmation token received via email.
     * @return ResponseEntity containing a success message or an error message.
     */
    @GetMapping(path = "/confirmSignUp")
    @Transactional
    public ResponseEntity<?> confirmSignUp(@RequestParam("token") String token) {
        // get token;
        ConfirmationToken confirmationToken = confirmationTokenService.getToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token is not found."));
        // check if email is already verified;
        if (confirmationToken.getConfirmedAt() != null) {
            return new ResponseEntity<>(userService.generateHtmlPage("Email is already confirmed, please sign in. Returning to the log in page...", "https://uni-task.vercel.app/login"), HttpStatus.OK);
//            throw new RuntimeException("Error: Email is already confirmed");
        }
        // check if the token is expired;
        LocalDateTime expiredAt = confirmationToken.getExpiredAt();
        if (expiredAt.isBefore(LocalDateTime.now())) {
            return new ResponseEntity<>(userService.generateHtmlPage("Token is expired, please register again. Returning to the sign up page...", "https://uni-task.vercel.app/login/signup"), HttpStatus.OK);
//            throw new RuntimeException("Error: Token is expired");
        }

        // update confirmation token and enable the user;
        confirmationTokenService.setConfirmedAt(token);
        User user = userRepository.getReferenceById(confirmationToken.getUser().getId());
        user.setEnabled(true);

        // return message;
        return ResponseEntity.ok(userService.generateHtmlPage("Email is confirmed, please log in!", "https://uni-task.vercel.app/login"));
    }



//    @GetMapping(path = "/getUserWorkspaces")
//    public ResponseEntity<Set<Project>> getUserProjectList(@RequestHeader("Authorization") String header) {
//        User curUser = userService.getUserEmailFromToken(header);
//        Set<Project> userProjects = curUser.getProjects();
//        if (userProjects.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(userProjects, HttpStatus.OK);
//    }

    /**
     * Method to get all existing users.
     *
     * @return A list of all existing users.
     */
    @GetMapping(path = "getAllUsers")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

}
