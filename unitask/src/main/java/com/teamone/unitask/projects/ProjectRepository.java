package com.teamone.unitask.projects;

import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

//    List<Project> findProjectsByUserId(Long userId);

    Boolean existsByProjectTitle(String projectTitle);

    Project findByProjectTitle(String projectTitle);
}
