package com.teamone.unitask.repository;

import com.teamone.unitask.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
