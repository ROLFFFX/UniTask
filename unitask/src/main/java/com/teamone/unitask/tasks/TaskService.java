package com.teamone.unitask.tasks;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * The service class for the Task controller.
 */
@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    /**
     * Helper method for updating a task.
     *
     * @param updatedTask The updated task object.
     * @param taskId The ID of the task to be updated.
     * @param username The username of the user assigned to the task (can be null).
     * @return The updated task if successful, null otherwise.
     */
    public Task updateTask(Task updatedTask, Long taskId, String username) {

        if (taskRepository.existsByTaskId(taskId)) {
            Task existingTask = taskRepository.getByTaskId(taskId);

            // Update task details
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setStatus(updatedTask.getStatus());
            existingTask.setTaskPoints(updatedTask.getTaskPoints());
            existingTask.setExpectedCompleteTime(updatedTask.getExpectedCompleteTime());

            if (username == null) {
                // If username is null, remove assigned user
                existingTask.setTaskMemberAssigned(null);
            } else if (userRepository.existsByUsername(username)) {
                // If username is valid, update assigned user
                existingTask.setTaskMemberAssigned(userRepository.getByUsername(username));
            }

            // Save the updated task
            taskRepository.save(existingTask);

            return  existingTask;
        } else {
            // Task not found
            return null;
        }

    }

    /**
     * Helper method for deleting an existing task by its ID.
     *
     * @param taskId The ID of the task to be deleted.
     * @return The deleted task.
     * @throws ResourceNotFoundException if the task is not found.
     */
    public Task deleteTask(Long taskId) {

        Task taskToDelete = taskRepository.findById(taskId).
                orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));

        // Delete child tasks
        List<Task> childrenTasks = taskRepository.findByParentTaskId(taskId);
        for(Task task : childrenTasks) {
            taskRepository.deleteById(task.getTaskId());
        }

        // Delete the task
        taskRepository.deleteById(taskId);

        // Return the deleted task object
        return taskToDelete;
    }

}
