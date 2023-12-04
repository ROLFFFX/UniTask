package com.teamone.unitask.report;

import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * The repository class for the Report entity.
 */
@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    /**
     * Find reports by project ID.
     *
     * @param projectId   The ID of the project for which reports are to be retrieved.
     * @return            List of reports belonging to the specified project.
     */
    List<Report> findReportsByProjectId(Project projectId);
}
