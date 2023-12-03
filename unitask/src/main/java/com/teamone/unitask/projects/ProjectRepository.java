package com.teamone.unitask.projects;

import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Repository interface for the Project entity.
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

//    List<Project> findProjectsByUserId(Long userId);

    /**
     * Check if a project with the given title exists.
     *
     * @param projectTitle Title of the project.
     * @return True if the project with the given title exists, false otherwise.
     */
    Boolean existsByProjectTitle(String projectTitle);

    /**
     * Find a project by its title.
     *
     * @param projectTitle Title of the project.
     * @return Project with the given title if it exists.
     */
    Project findByProjectTitle(String projectTitle);

    /**
     * Find a project by its ID.
     *
     * @param projectId ID of the project.
     * @return Project with the given ID if it exists.
     */
    Project findByProjectId(Long projectId);
}
