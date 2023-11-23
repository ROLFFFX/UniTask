package com.teamone.unitask.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/reports")
public class ReportController {

    @Autowired
    ReportService reportService;


    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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

    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/getListReports/{projectTitle}")
    public ResponseEntity<List<Report>> getReportsByProjectTitle(@PathVariable("projectTitle") String projectTitle) {

        List<Report> listReports = reportService.getReportsByProjectTitle(projectTitle);

        if (listReports == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(listReports, HttpStatus.OK);
        }
    }

    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping(path = "/editReport/{reportId}")
    public ResponseEntity<Report> editReportByReportId(@PathVariable("reportId") Long reportId,
                                                       @RequestBody Report report) {

        Report reportToEdit = reportService.editReport(reportId, report);

        return new ResponseEntity<>(reportToEdit, HttpStatus.OK);
    }

    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @DeleteMapping(path = "/deleteReport/{reportId}")
    public ResponseEntity<Report> deleteReportByReportId(@PathVariable("reportId") Long reportId) {

        Report reportToDelete = reportService.deleteReportByReportId(reportId);

        return new ResponseEntity<>(reportToDelete, HttpStatus.OK);
    }

}
