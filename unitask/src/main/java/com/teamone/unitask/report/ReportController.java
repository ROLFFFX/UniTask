package com.teamone.unitask.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * The controller class for the Report entity, providing APIs for the report web page.
 */
@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping(path = "/reports")
public class ReportController {

    @Autowired
    ReportService reportService;


    /**
     * Create a new report object and store it in the database.
     *
     * @param projectTitle    The title of the project to which the report belongs.
     * @param requestReport   The report details received in the request body.
     * @return                ResponseEntity with the created report or NO_CONTENT status if unsuccessful.
     */
    @PostMapping(path = "/createReport/{projectTitle}")
    public ResponseEntity<Report> createReport(@PathVariable("projectTitle") String projectTitle,
                                               @RequestBody Report requestReport) {

        Report newReport = reportService.createReport(requestReport, projectTitle);

        if (newReport == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(newReport, HttpStatus.CREATED);
        }
    }

    /**
     * Get all reports in the given project.
     *
     * @param projectTitle    The title of the project for which reports are requested.
     * @return                ResponseEntity with the list of reports or NO_CONTENT status if no reports found.
     */
    @GetMapping(path = "/getListReports/{projectTitle}")
    public ResponseEntity<List<Report>> getReportsByProjectTitle(@PathVariable("projectTitle") String projectTitle) {

        List<Report> listReports = reportService.getReportsByProjectTitle(projectTitle);

        if (listReports == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(listReports, HttpStatus.OK);
        }
    }

    /**
     * Edit an existing report in the project.
     *
     * @param reportId        The ID of the report to be edited.
     * @param report          The updated report details received in the request body.
     * @return                ResponseEntity with the edited report or OK status if unsuccessful.
     */
    @PutMapping(path = "/editReport/{reportId}")
    public ResponseEntity<Report> editReportByReportId(@PathVariable("reportId") Long reportId,
                                                       @RequestBody Report report) {

        Report reportToEdit = reportService.editReport(reportId, report);

        return new ResponseEntity<>(reportToEdit, HttpStatus.OK);
    }

    /**
     * Delete the given report from the project.
     *
     * @param reportId        The ID of the report to be deleted.
     * @return                ResponseEntity with the deleted report or OK status if unsuccessful.
     */
    @DeleteMapping(path = "/deleteReport/{reportId}")
    public ResponseEntity<Report> deleteReportByReportId(@PathVariable("reportId") Long reportId) {

        Report reportToDelete = reportService.deleteReportByReportId(reportId);

        return new ResponseEntity<>(reportToDelete, HttpStatus.OK);
    }

}
