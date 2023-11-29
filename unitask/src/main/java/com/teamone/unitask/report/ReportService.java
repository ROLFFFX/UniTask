package com.teamone.unitask.report;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The service class for the Report controller
 */
@Service
public class ReportService {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    ProjectRepository projectRepository;

    /*
     * helper method to create a new report;
     */
    public Report createReport(Report requestReport, String projectTitle) {

        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        Report curReport = requestReport;
        curReport.setProjectId(curProject);

        reportRepository.save(curReport);

        return curReport;
    }

    /*
     * helper method to get all report in a project;
     */
    public List<Report> getReportsByProjectTitle(String projectTitle) {

        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        List<Report> listReports = reportRepository.findReportsByProjectId(curProject);

        return listReports;
    }

    /*
     * helper method to edit an existing report;
     */
    public Report editReport(Long reportId, Report report) {

        Report curReport = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));

        curReport.setReportName(report.getReportName());
        curReport.setAccomplishment(report.getAccomplishment());
        curReport.setFeedback(report.getFeedback());
        curReport.setMemberComment(report.getMemberComment());

        reportRepository.save(curReport);

        return curReport;
    }

    /*
     * helper method to delete a report by its id;
     */
    public Report deleteReportByReportId(Long reportId) {

        Report reportToDelete = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));

        reportRepository.delete(reportToDelete);

        return reportToDelete;
    }
}
