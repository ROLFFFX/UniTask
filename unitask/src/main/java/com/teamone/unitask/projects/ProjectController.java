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
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


/**
 * The controller class for the project entity, mainly build APIs for the workspace web page
 */
//@CrossOrigin(origins = "", maxAge = 3600)
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

    /*
     * create new workspace for user;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/createNewWorkspace")
    public ResponseEntity<Project> createProject(@RequestBody Project requestProject,
                                                 @RequestHeader("Authorization") String header) {

        // check if current workspace title already existed; if yes, throw the error status;
        if (projectRepository.existsByProjectTitle(requestProject.getProjectTitle())) {
//            _project = projectRepository.findByProjectTitle(requestProject.getProjectTitle());
//            curUser.addProject(_project);
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }

        // get user information from JWT and create the workspace object;
        User curUser = userService.getUserEmailFromToken(header);
        Project _project = requestProject;
        projectRepository.save(_project);
        curUser.addProject(_project);
        userRepository.save(curUser);

        return new ResponseEntity<>(_project, HttpStatus.CREATED);
    }

    /*
     * get all workspaces the given user is enrolled in;
     */
    @GetMapping(path = "/getUserWorkspaces")
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Set<Project>> getUserProjectList(@RequestHeader("Authorization") String header) {

        // get user information from the JWT;
        User curUser = userService.getUserEmailFromToken(header);

        // get all project that the user is enrolled in and return;
        Set<Project> userProjects = curUser.getProjects();
        if (userProjects.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userProjects, HttpStatus.OK);
    }


    /*
     * get all users enrolled in the project;
     */
    @GetMapping(path = "/workspaceMembers/{projectTitle}")
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List<User>> getAllUsersByProjectName(@PathVariable("projectTitle") String projectTitle) {

        // if project does not exist;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // find the users that participated in the project;
        List<User> projectMember = userRepository.findUserByProjects(projectRepository.findByProjectTitle(projectTitle));

        return new ResponseEntity<>(projectMember, HttpStatus.OK);
    }

    /*
     * add a user to an existing workspace by email address;
     */
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @PostMapping(path = "/addUserToWorkspace/{email}/{projectTitle}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<MessageResponse> addUserToProjectByEmail(@PathVariable("email") String email,
                                                                   @PathVariable("projectTitle") String projectTitle) {

        // if project does not exist;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return new ResponseEntity<>(new MessageResponse("Error: Project does not exist"), HttpStatus.BAD_REQUEST);
        }

        // if user does not exist;
        if (!userRepository.existsByEmail(email)) {
            return new ResponseEntity<>(new MessageResponse("Error: User does not exist"), HttpStatus.BAD_REQUEST);
        }

        // add project to user's project list;
        User userToAdd = userRepository.getByEmail(email);
        Project projectToJoin = projectRepository.findByProjectTitle(projectTitle);

        userToAdd.addProject(projectToJoin);
        userRepository.save(userToAdd);

        return new ResponseEntity<>(new MessageResponse("User successfully added!"), HttpStatus.CREATED);
    }

    /*
     * delete a workspace;
     */
    @DeleteMapping(path = "/deleteUserFromWorkspace/{email}/{projectTitle}")
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<MessageResponse> deleteUserFromProjectByEmail(@PathVariable("email") String email,
                                                                        @PathVariable("projectTitle") String projectTitle) {

        // if project does not exist;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return new ResponseEntity<>(new MessageResponse("Error: Project does not exist"), HttpStatus.BAD_REQUEST);
        }

        // if user does not exist;
        if (!userRepository.existsByEmail(email)) {
            return new ResponseEntity<>(new MessageResponse("Error: User does not exist"), HttpStatus.BAD_REQUEST);
        }

        // delete user from project;
        User userToDelete = userRepository.getByEmail(email);
        Project projectDeleteFrom = projectRepository.findByProjectTitle(projectTitle);

        userToDelete.removeProject(projectDeleteFrom.getProjectId());
        userRepository.save(userToDelete);

        return new ResponseEntity<>(new MessageResponse("Successfully removed user from the project!"), HttpStatus.NO_CONTENT);
    }

    /*
     * get the workspace creation time;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/creationTime/{projectTitle}")
    public ResponseEntity<LocalDateTime> getWorkspaceCreationTime(@PathVariable("projectTitle") String projectTitle) {

        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            LocalDateTime creationTime = projectRepository.findByProjectTitle(projectTitle).getWorkSpaceCreationTime();
            return new ResponseEntity<>(creationTime, HttpStatus.OK);
        }
    }


}
