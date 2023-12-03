package com.teamone.unitask.timeslots;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


/**
 * Rest Controller for managing time slots associated with projects.
 * This controller handles operations such as retrieving, creating, deleting,
 * and finding common time slots for a given project.
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/test")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    /**
     * Constructor to create an instance of TimeSlotController with the provided time slot service.
     *
     * @param timeSlotService Service to handle operations related to time slots.
     */
    public TimeSlotController(TimeSlotService timeSlotService){
        this.timeSlotService = timeSlotService;
    }

    /**
     * Retrieves a list of time slots for a specified project.
     *
     * @param projectTitle The title of the project.
     * @param token        Authorization token for the request.
     * @return ResponseEntity with the list of TimeSlots or the appropriate HTTP status.
     */
    @GetMapping("/timeslot/{projectTitle}")
    public ResponseEntity<List<TimeSlot>> getUserTimeSlots(@PathVariable String projectTitle,
                                                           @RequestHeader("Authorization") String token) {
        try {
            List<TimeSlot> timeSlots = timeSlotService.get(projectTitle, token);
            if (timeSlots.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(timeSlots, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Posts a list of time slots for a specific project.
     *
     * @param projectTitle The title of the project.
     * @param token        Authorization token for the request.
     * @param timeSlots    List of TimeSlots to be added.
     * @return ResponseEntity with the list of TimeSlots or the appropriate HTTP status.
     */
    @PostMapping("/timeslot/{projectTitle}")
    public ResponseEntity<List<TimeSlot>> createListTimeSlots(@PathVariable String projectTitle,
                                                              @RequestHeader("Authorization") String token,
                                                              @RequestBody List<TimeSlot> timeSlots) {
        try {
            timeSlotService.save(projectTitle, token, timeSlots);
            return new ResponseEntity<>(timeSlots, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Deletes all time slots associated with a specific project.
     *
     * @param projectTitle The title of the project.
     * @param token        Authorization token for the request.
     * @return ResponseEntity with HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/timeslot/{projectTitle}")
    public ResponseEntity<HttpStatus> deleteAllTimeSlots(@PathVariable String projectTitle,
                                                         @RequestHeader("Authorization") String token) {
        try {
            timeSlotService.deleteAllTS(projectTitle, token);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves a list of common time slots across all members of a project.
     *
     * @param projectTitle The title of the project for which to find common time slots.
     * @return ResponseEntity with the list of common TimeSlots or the appropriate HTTP status.
     */
    @GetMapping("/timeslot/overlap/{projectTitle}")
    public ResponseEntity<List<TimeSlot>> commonTimeSlot(@PathVariable String projectTitle) {
        try {
            List<TimeSlot> commonList = timeSlotService.calcCommon(projectTitle);
            return new ResponseEntity<>(commonList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves a list of usernames of members who have submitted available time slots for a specific project.
     *
     * @param projectTitle The title of the project.
     * @return ResponseEntity with the list of usernames or the appropriate HTTP status.
     */
    @GetMapping("/timeslot/members/{projectTitle}")
    public ResponseEntity<List<String>> membersSubmitted(@PathVariable String projectTitle) {
        try {
            List<String> membersList = timeSlotService.membersSubmitted(projectTitle);
            return new ResponseEntity<>(membersList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Checks whether any available time slots have been submitted for a given project.
     *
     * @param projectTitle The title of the project.
     * @return ResponseEntity with a boolean indicating whether time slots have been selected and the appropriate HTTP status.
     */
    @GetMapping("/timeslot/inSession/{projectTitle}")
    public ResponseEntity<Boolean> inSession(@PathVariable String projectTitle) {
        try {
            Boolean inSession = timeSlotService.projNonEmpty(projectTitle);
            return new ResponseEntity<>(inSession, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Deletes a specific time slot by its ID. Currently not used in the application.
     *
     * @param timeSlotId The ID of the time slot to be deleted.
     * @return ResponseEntity with the deleted TimeSlot or the appropriate HTTP status.
     */
    @DeleteMapping("/timeslot/deleteOne/{timeSlotId}")
    public ResponseEntity<TimeSlot> deleteAllTimeSlots(@PathVariable Long timeSlotId) {
        try {
            timeSlotService.deleteOneTS(timeSlotId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Clears all time slots associated with a specific project.
     *
     * @param projectTitle The title of the project from which to clear time slots.
     * @return ResponseEntity with HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/timeslot/clearall/{projectTitle}")
    public ResponseEntity<HttpStatus> clearAllProjectTS(@PathVariable String projectTitle) {
        try {
            timeSlotService.clearProjTS(projectTitle);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
