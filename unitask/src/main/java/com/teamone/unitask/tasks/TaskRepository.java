package com.teamone.unitask.tasks;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.tasks.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * The repository class for the task entity
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Task getByTaskId(Long taskId);

    List<Task> findByProjectBelonged(Project project);

    List<Task> findByParentTaskId(Long parentTaskId);

    boolean existsByTaskId(Long id);

    List<Task> findTasksByTaskMemberAssignedAndProjectBelonged(User memberAssigned, Project projectBelonged);
}
