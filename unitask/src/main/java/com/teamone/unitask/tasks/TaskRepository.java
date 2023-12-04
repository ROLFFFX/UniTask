package com.teamone.unitask.tasks;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.tasks.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * The repository class for the Task entity
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    /**
     * Retrieves a task by its ID.
     *
     * @param taskId The ID of the task.
     * @return The task with the given ID.
     */
    Task getByTaskId(Long taskId);

    /**
     * Retrieves a list of tasks that belong to the specified project.
     *
     * @param project The project to which the tasks belong.
     * @return A list of tasks in the specified project.
     */
    List<Task> findByProjectBelonged(Project project);

    /**
     * Retrieves a list of tasks that have the specified task as their parent.
     *
     * @param parentTaskId The ID of the parent task.
     * @return A list of tasks that are children of the specified parent task.
     */
    List<Task> findByParentTaskId(Long parentTaskId);

    /**
     * Checks if a task with the specified ID exists.
     *
     * @param id The ID of the task.
     * @return True if a task with the specified ID exists, false otherwise.
     */
    boolean existsByTaskId(Long id);

    /**
     * Retrieves a list of tasks assigned to a specific user in a given project.
     *
     * @param memberAssigned The user to whom the tasks are assigned.
     * @param projectBelonged The project to which the tasks belong.
     * @return A list of tasks assigned to the specified user in the specified project.
     */
    List<Task> findTasksByTaskMemberAssignedAndProjectBelonged(User memberAssigned, Project projectBelonged);
}
