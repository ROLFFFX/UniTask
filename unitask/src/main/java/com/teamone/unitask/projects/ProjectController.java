package com.teamone.unitask.projects;

import com.teamone.unitask.onboard.UserService;
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

//    @Autowired
//    JwtUtils jwtUtils;

    @Autowired
    ProjectService projectService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

//    @PostMapping("/createProject")
//    public ResponseEntity<?> createProject(@RequestBody Project project, @RequestHeader("Authorization") String header) {
////        try {
////            User curUser = userService.getUserEmailFromToken(header);
////            curUser.getProjectsJoined().add(project);
////            projectRepository.save(project);
////            return ResponseEntity.ok(new MessageResponse("New project successfully created!"));
////        } catch (Exception e) {
////            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot create new project."));
////        }
//        return projectService.createProject(project, header);
//    }
//
//    @GetMapping("/getAllProject")
//    public ResponseEntity<?> getAllProject(@RequestHeader("Authorization") String header) {
////        return projectService.getAllUserProjects(header);
//        try {
//            User curUser = userService.getUserEmailFromToken(header);
////            Long userId = curUser.getId();
//            List<Project> userProjects = curUser.getProjectsJoined();
//            return ResponseEntity.ok(userProjects);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot pull projects from the database"));
//        }
//    }



//    private String extractTokenFromAuthorizationHeader(String authorizationHeader) {
//
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            return authorizationHeader.substring(7);
//        }
//        return null;
//    }

}
