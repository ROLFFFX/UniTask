package com.teamone.unitask.timeslots;

import com.teamone.unitask.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "localhost:3000/meeting", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService){this.timeSlotService=timeSlotService;}


    //get the list of timeslots by the userId
    @GetMapping("/timeslot/{projectId}/{userId}")
    public ResponseEntity<List<TimeSlot>> getUserTimeSlots(@PathVariable Long projectId,
                                                           @PathVariable Long userId) {
        try {
            List<TimeSlot> timeSlots = timeSlotService.get(projectId, userId);
            if (timeSlots.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(timeSlots, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //post a list of timeslots
    @PostMapping("/timeslot/{projectId}/{userId}")
    public ResponseEntity<List<TimeSlot>> createListTimeSlots(@PathVariable Long projectId,
                                                              @PathVariable Long userId,
                                                              @RequestBody List<TimeSlot> timeSlots) {
        try {
            timeSlotService.save(projectId, userId, timeSlots);
            return new ResponseEntity<>(timeSlots, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //delete list of timeslots
    @DeleteMapping("/timeslot/{projectId}/{userId}")
    public ResponseEntity<HttpStatus> deleteAllTimeSlots(@PathVariable Long projectId,
                                                 @PathVariable Long userId) {
        try {
            timeSlotService.deleteAllTS(projectId, userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //CURRENTLY NOT USED
    //delete a specific timeslot
    @DeleteMapping("/timeslot/deleteOne/{timeSlotId}")
    public ResponseEntity<TimeSlot> deleteAllTimeSlots(@PathVariable Long timeSlotId) {
        try {
            timeSlotService.deleteOneTS(timeSlotId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
