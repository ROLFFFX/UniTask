package com.teamone.unitask.tasks;

import com.teamone.unitask.onboard.payload.response.MessageResponse;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import com.teamone.unitask.projects.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


/**
 * The controller class for the task board page
 */
@RestController
@RequestMapping(path = "tasks")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    TaskService taskService;


    /*
     * create a new task
     */
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping(path = "/createTask", consumes={MediaType.APPLICATION_JSON_UTF8_VALUE} )
    public ResponseEntity<Task> creatNewTask(@RequestBody Task requestTask,
                                                      @RequestParam(name = "taskId") Long taskId,
                                                      @RequestParam(name = "projectTitle") String projectTitle,
                                                      @RequestParam(name = "username") String username) {
        Task newTask = requestTask;

        // update assigned user;
        if (username != null) {
            if (userRepository.existsByUsername(username)) {
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
        if (projectRepository.existsByProjectTitle(projectTitle)) {
            Project projectAssigned = projectRepository.findByProjectTitle(projectTitle);
            newTask.setProjectBelonged(projectAssigned);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }


        taskRepository.save(newTask);

        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    /*
     * get all the task in the given project;
     */
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/getAllTask")
    public ResponseEntity<List<List<Task>>> getAllTaskByProjectTitle(@RequestParam("projectTitle") String projectTitle) {

        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Project projectBelonged = projectRepository.findByProjectTitle(projectTitle);

        List<Task> allTaskInProject = taskRepository.findByProjectBelonged(projectBelonged);

        Iterator<Task> iterator = allTaskInProject.iterator();

        while (iterator.hasNext()) {
            Task cur_task = iterator.next();
            if (cur_task.getParentTaskId() != null) {
                iterator.remove();
            }
        }

        List<List<Task>> allTasksIncluded = new ArrayList<>();
        for(Task t: allTaskInProject) {
            List<Task> curTaskStack = taskRepository.findByParentTaskId(t.getTaskId());
            curTaskStack.add(0, t);
            allTasksIncluded.add(curTaskStack);
        }

        return new ResponseEntity<>(allTasksIncluded, HttpStatus.OK);
    }

    /*
     * edit an existing task;
     */
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @PutMapping(path = "/updateTask")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Task> updateTask(@RequestBody Task task,
                                           @RequestParam("taskId") Long taskId,
                                           @RequestParam("username") String username) {

        Task existingTask = taskService.updateTask(task, taskId, username);

        if (existingTask == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(existingTask, HttpStatus.OK);
        }
    }

    /*
     * delete the given existing class;
     */
//    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @DeleteMapping(path = "/deleteTask")
    public ResponseEntity<Task> deleteTaskById(@RequestParam("taskId") Long taskId) {

        Task taskToDelete = taskService.deleteTask(taskId);

        return new ResponseEntity<>(taskToDelete, HttpStatus.OK);
    }

}
