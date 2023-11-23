package com.teamone.unitask.report;

import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findReportsByProjectId(Project projectId);
}
