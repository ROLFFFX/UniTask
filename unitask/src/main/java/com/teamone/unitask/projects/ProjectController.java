package com.teamone.unitask.projects;

import com.teamone.unitask.onboard.UserService;
import com.teamone.unitask.onboard.payload.response.MessageResponse;
import com.teamone.unitask.onboard.security.jwt.JwtUtils;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @PostMapping("/createNewWorkspace")
    public ResponseEntity<Project> createProject(@RequestBody Project requestProject, @RequestHeader("Authorization") String header) {
        User curUser = userService.getUserEmailFromToken(header);
        Project _project = null;

        if (projectRepository.existsByProjectTitle(requestProject.getProjectTitle())) {
            _project = projectRepository.findByProjectTitle(requestProject.getProjectTitle());
            curUser.addProject(_project);
        } else {
            curUser.addProject(requestProject);
            projectRepository.save(requestProject);
            _project = requestProject;
        }

        userRepository.save(curUser);

        return new ResponseEntity<>(_project, HttpStatus.CREATED);
    }

    @GetMapping(path = "/getUserWorkspaces")
    public ResponseEntity<Set<Project>> getUserProjectList(@RequestHeader("Authorization") String header) {
        User curUser = userService.getUserEmailFromToken(header);
        Set<Project> userProjects = curUser.getProjects();
        if (userProjects.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userProjects, HttpStatus.OK);
    }

}
