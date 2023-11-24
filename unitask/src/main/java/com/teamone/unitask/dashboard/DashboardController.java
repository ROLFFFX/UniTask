package com.teamone.unitask.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(path = "/dashboard")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;


    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/taskDistribution/{projectTitle}")
    public ResponseEntity<HashMap<String, Integer>> getTaskDistributionByProjectTitle(@PathVariable String projectTitle) {

        HashMap<String, Integer> taskDistribution = dashboardService.getTaskDistributionByProjectTitle(projectTitle);

        if (taskDistribution == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity<>(taskDistribution, HttpStatus.OK);
        }
    }

    //    @CrossOrigin(origins = "https://uni-task-beta-front.vercel.app/", allowCredentials = "true")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/progressBar/{projectTitle}")
    public ResponseEntity<HashMap<String, Integer>> getCurProjectTeamProgress(@PathVariable String projectTitle) {

        HashMap<String, Integer> teamProgress = dashboardService.getTeamProgressByProjectTitle(projectTitle);

        if (teamProgress == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity<>(teamProgress, HttpStatus.OK);
        }
    }
}
