package com.teamone.unitask.report;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The service class for the Report controller.
 */
@Service
public class ReportService {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    ProjectRepository projectRepository;

    /**
     * Create a new report.
     *
     * @param requestReport The report object to be created.
     * @param projectTitle  The title of the project to which the report belongs.
     * @return              The created report.
     */
    public Report createReport(Report requestReport, String projectTitle) {

        // Check if the project exists
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // Retrieve the project
        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        // Set the project for the report
        Report curReport = requestReport;
        curReport.setProjectId(curProject);

        // Save the report
        reportRepository.save(curReport);

        // return the report
        return curReport;
    }

    /**
     * Get all reports in a project.
     *
     * @param projectTitle  The title of the project to retrieve reports from.
     * @return              List of reports in the specified project.
     */
    public List<Report> getReportsByProjectTitle(String projectTitle) {

        // Check if the project exists
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // Retrieve the project
        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        // Retrieve reports for the project
        List<Report> listReports = reportRepository.findReportsByProjectId(curProject);

        // return the lists of reports
        return listReports;
    }

    /**
     * Edit an existing report.
     *
     * @param reportId  The ID of the report to be edited.
     * @param report    The updated report information.
     * @return          The edited report.
     */
    public Report editReport(Long reportId, Report report) {

        // Retrieve the report to be edited
        Report curReport = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));

        // Update report information
        curReport.setReportName(report.getReportName());
        curReport.setAccomplishment(report.getAccomplishment());
        curReport.setFeedback(report.getFeedback());
        curReport.setMemberComment(report.getMemberComment());

        // Save the edited report
        reportRepository.save(curReport);

        // return the edited report object
        return curReport;
    }

    /**
     * Delete a report by its ID.
     *
     * @param reportId  The ID of the report to be deleted.
     * @return          The deleted report.
     */
    public Report deleteReportByReportId(Long reportId) {

        // Retrieve the report to be deleted
        Report reportToDelete = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));

        // Delete the report
        reportRepository.delete(reportToDelete);

        // return the deleted report object
        return reportToDelete;
    }
}
