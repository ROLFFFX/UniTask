package com.teamone.unitask.tasks;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * The service class for the task controller
 */
@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    /*
     * helper method for the updating a task;
     */
    public Task updateTask(Task updatedTask, Long taskId, String username) {

        if (taskRepository.existsByTaskId(taskId)) {
            Task existingTask = taskRepository.getByTaskId(taskId);

            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setStatus(updatedTask.getStatus());
            existingTask.setTaskPoints(updatedTask.getTaskPoints());
            existingTask.setExpectedCompleteTime(updatedTask.getExpectedCompleteTime());

            if (username == null) {
                existingTask.setTaskMemberAssigned(null);
            } else if (userRepository.existsByUsername(username)) {
                existingTask.setTaskMemberAssigned(userRepository.getByUsername(username));
            }

            taskRepository.save(existingTask);

            return  existingTask;
        } else {
            return null;
        }

    }

    /*
     * helper method for deleting an existing task by its id;
     */
    public Task deleteTask(Long taskId) {

        Task taskToDelete = taskRepository.findById(taskId).
                orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));

        List<Task> childrenTasks = taskRepository.findByParentTaskId(taskId);

        for(Task task : childrenTasks) {
            taskRepository.deleteById(task.getTaskId());
        }

        taskRepository.deleteById(taskId);

        return taskToDelete;
    }

}
