package com.teamone.unitask.projects;

import com.teamone.unitask.onboard.payload.response.MessageResponse;
import com.teamone.unitask.onboard.security.jwt.JwtUtils;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/createProject")
    public ResponseEntity<?> createProject(@RequestBody Project project, @RequestHeader("Authorization") String header) {
        try {
            String jwtToken = extractTokenFromAuthorizationHeader(header);
            String email = jwtUtils.getUserNameFromJwtToken(jwtToken);
            User curUser = userRepository.getByEmail(email);
            curUser.getProjectsJoined().add(project);
            projectRepository.save(project);
            return ResponseEntity.ok(new MessageResponse("New project successfully created!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot create new project."));
        }
    }

    @GetMapping("/getAllProject")
    public List<Project> getAllProject(@RequestHeader("Authorization") String header) {
        
        return projectRepository.findAll();
    }

    private String extractTokenFromAuthorizationHeader(String authorizationHeader) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

}
