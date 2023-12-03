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
 * The controller class for the task board page.
 */
@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
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


    /**
     * Create a new task.
     *
     * @param requestTask The task details to create.
     * @param taskId The ID of the parent task, if any.
     * @param projectTitle The title of the project to which the task belongs.
     * @param username The username of the user assigned to the task.
     * @return ResponseEntity with the created task or null if the request is invalid.
     */
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

    /**
     * Get all the tasks in the given project.
     *
     * @param projectTitle The title of the project.
     * @return ResponseEntity with a list of tasks or null if the project is not found.
     */
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

    /**
     * Edit an existing task.
     *
     * @param task The updated task details.
     * @param taskId The ID of the task to update.
     * @param username The username of the user assigned to the task.
     * @return ResponseEntity with the updated task or null if the request is invalid.
     */
    @PutMapping(path = "/updateTask")
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

    /**
     * Delete the given existing task.
     *
     * @param taskId The ID of the task to delete.
     * @return ResponseEntity with the deleted task or null if the task is not found.
     */
    @DeleteMapping(path = "/deleteTask")
    public ResponseEntity<Task> deleteTaskById(@RequestParam("taskId") Long taskId) {

        Task taskToDelete = taskService.deleteTask(taskId);

        return new ResponseEntity<>(taskToDelete, HttpStatus.OK);
    }

}
