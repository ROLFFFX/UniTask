package com.teamone.unitask.projects;

import com.teamone.unitask.onboard.UserService;
import com.teamone.unitask.onboard.payload.response.MessageResponse;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;


/**
 * The service class for the project controller
 */
@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserService userService;

//    public ResponseEntity<?> createProject(Project project, String header) {
//        try {
//            User curUser = userService.getUserEmailFromToken(header);
//            curUser.getProjectsJoined().add(project);
//            projectRepository.save(project);
//            return ResponseEntity.ok(new MessageResponse("New project successfully created!"));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot create new project."));
//        }
//    }
//
//    public List<Project> getAllUserProjects(String header) {
//        try {
//            User curUser = userService.getUserEmailFromToken(header);
////            Long userId = curUser.getId();
//            if (curUser != null) {
//                return curUser.getProjectsJoined();
//            }
//            return ResponseEntity.ok(userProjects);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot pull projects from the database"));
//        }
//    }
}
