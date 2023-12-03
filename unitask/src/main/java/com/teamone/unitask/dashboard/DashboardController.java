package com.teamone.unitask.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


/**
 * The Controller class for the Dashboard page;
 */
@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping(path = "/dashboard")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;


    /**
     * Retrieves task distribution by project title.
     *
     * @param projectTitle The title of the project.
     * @return ResponseEntity containing a HashMap with usernames as keys and completed task points as values.
     * HttpStatus.OK if successful, HttpStatus.NOT_ACCEPTABLE if errors occur.
     */
    @GetMapping(path = "/taskDistribution/{projectTitle}")
    public ResponseEntity<HashMap<String, Integer>> getTaskDistributionByProjectTitle(@PathVariable String projectTitle) {

        // call helper function from the service layer;
        HashMap<String, Integer> taskDistribution = dashboardService.getTaskDistributionByProjectTitle(projectTitle);
        // check the results; if null, errors occurred, return with status HttpStatus.NOT_ACCEPTABLE;
        // else, return the HashMap object and HttpStatus.OK;
        if (taskDistribution == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity<>(taskDistribution, HttpStatus.OK);
        }
    }


    /**
     * Retrieves current project team progress by project title.
     *
     * @param projectTitle The title of the project.
     * @return ResponseEntity containing a HashMap with task status as keys and the summation of task points as values.
     * HttpStatus.OK if successful, HttpStatus.NOT_ACCEPTABLE if errors occur.
     */
    @GetMapping(path = "/progressBar/{projectTitle}")
    public ResponseEntity<HashMap<String, Integer>> getCurProjectTeamProgress(@PathVariable String projectTitle) {

        // call helper function from the service layer;
        HashMap<String, Integer> teamProgress = dashboardService.getTeamProgressByProjectTitle(projectTitle);
        // check the results; if null, errors occurred, return with status HttpStatus.NOT_ACCEPTABLE;
        // else, return the HashMap object and HttpStatus.OK;
        if (teamProgress == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity<>(teamProgress, HttpStatus.OK);
        }
    }

}
