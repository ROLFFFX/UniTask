package com.teamone.unitask.projects;

import com.teamone.unitask.onboard.payload.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/prjects")
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @PostMapping("/createProject")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        try {
            projectRepository.save(project);
            return ResponseEntity.ok(new MessageResponse("New project successfully created!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot create new project."));
        }
    }

    @GetMapping("/getAllProject")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Project> getAllProject() {
        return projectRepository.findAll();
    }
}
