package com.teamone.unitask.tasks;

import com.teamone.unitask.projects.Project;
import com.teamone.unitask.tasks.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Task getByTaskId(Long taskId);

    List<Task> findByProjectBelonged(Project project);

    List<Task> findByParentTaskId(Long parentTaskId);

    boolean existsByTaskId(Long id);
}
