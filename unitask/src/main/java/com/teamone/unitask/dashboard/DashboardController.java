package com.teamone.unitask.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


/**
 * The Controller class for the Dashboard page;
 */
@RestController
@RequestMapping(path = "/dashboard")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;


    /*
     * receive project title as input, return a HashMap object that maps String objects to Integer Objects,
     * where the String is each of the username of users in the project, the Integer is each of the number
     * of task points completed by each user;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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


    /*
     * receive project title as input, return a HashMap object the maps String objects to Integer Objects,
     * where the String is each of the status of the tasks ("Not Started", "To Do", "Doing", "Done"), and
     * the Integer is each of the summation of the task points of each status;
     */
    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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
