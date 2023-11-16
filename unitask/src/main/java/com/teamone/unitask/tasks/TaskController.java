package com.teamone.unitask.tasks;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "tasks")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @PostMapping(path = "/createTask", consumes = "application/json")
    public ResponseEntity<Task> getAllTaskByProjectId(@RequestBody Task requestTask,
                                                      @RequestParam(name = "taskId") Long taskId,
                                                      @RequestParam(name = "projectTitle") String projectTitle,
                                                      @RequestParam(name = "username") String username) {
        Task newTask = requestTask;

        // update assigned user;
        if (username != null) {
            if (!userRepository.existsByUsername(username)) {
                User assignedUser = userRepository.getByUsername(username);
                newTask.setTaskMemberAssigned(assignedUser);
            }
        }
        // update parentTask id;
        if (taskId > 0) {
            if (taskRepository.existsByTaskId(taskId)) {
                newTask.setParentTaskId(taskId);
            } else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        }
        // update project assigned
        Project projectAssigned = projectRepository.findByProjectTitle(projectTitle);
        newTask.setProjectBelonged(projectAssigned);

        taskRepository.save(newTask);

        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

//    @GetMapping(path = "/getAllTask/{projectTitle}")
//    public ResponseEntity<List<List<Task>>> getAllTaskByProjectTitle(@PathVariable("projectTitle") String projectTitle) {
//
//        if (!projectRepository.existsByProjectTitle(projectTitle)) {
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//
//        Project projectBelonged = projectRepository.findByProjectTitle(projectTitle);
//
//        List<Task> allTaskInProject = taskRepository.findByProjectBelonged(projectBelonged);
//
//        for(int i = 0; i < allTaskInProject.size(); i++) {
//            if (allTaskInProject.get(i).getParentTaskId() != null) {
//                allTaskInProject.remove(i);
//            }
//        }
//
//        List<List<Task>> allTasksIncluded = new ArrayList<>();
//        for(Task t: allTaskInProject) {
//            List<Task> curTaskStack = taskRepository.findByParentTaskId(t);
//            curTaskStack.add(0, t);
//            allTasksIncluded.add(curTaskStack);
//        }
//
//        return new ResponseEntity<>(allTasksIncluded, HttpStatus.OK);
//    }

}
