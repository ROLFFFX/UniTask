package com.teamone.unitask.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.teamone.unitask.email.EmailSender;
import com.teamone.unitask.email.EmailService;
import com.teamone.unitask.model.ERole;
import com.teamone.unitask.model.Role;
import com.teamone.unitask.model.User;
import com.teamone.unitask.payload.request.LoginRequest;
import com.teamone.unitask.payload.request.SignupRequest;
import com.teamone.unitask.payload.response.JwtResponse;
import com.teamone.unitask.payload.response.MessageResponse;
import com.teamone.unitask.repository.RoleRepository;
import com.teamone.unitask.repository.UserRepository;
import com.teamone.unitask.security.jwt.JwtUtils;
import com.teamone.unitask.security.services.UserDetailsImpl;
import com.teamone.unitask.email.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
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

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        // Generate token
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
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
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            //TODO: fix default;
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        // generate register token;
        String signupToken = UUID.randomUUID().toString();
        // create email link and send email;
        //TODO: need to modify when deploy;
        String link = "http://localhost:8080/api/v1/registration/confirm?token=" + signupToken;
        emailService.send(signUpRequest.getEmail(),
                emailService.buildEmail(signUpRequest.getUsername(), link));
        // return generated token;
        return ResponseEntity.ok(new MessageResponse("Email sent!"));
    }

//    @GetMapping(path = "confirmSignUp")
//    public ResponseEntity<?> confirmSignUp(@RequestParam("token") String token) {
//
//    }

}
