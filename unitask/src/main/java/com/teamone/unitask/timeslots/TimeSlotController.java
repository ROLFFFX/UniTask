package com.teamone.unitask.timeslots;

import com.teamone.unitask.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "https://uni-task.vercel.app/", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/test")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService){this.timeSlotService=timeSlotService;}


    //get the list of timeslots by the userId
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

    //post a list of timeslots
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

    //delete list of timeslots
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

    //respond with a list of timeslots(length >= 30min) that correspond to the common timeslots in a project
    @GetMapping("/timeslot/overlap/{projectTitle}")
    public ResponseEntity<List<TimeSlot>> commonTimeSlot(@PathVariable String projectTitle) {
        try {
            List<TimeSlot> commonList = timeSlotService.calcCommon(projectTitle);
            return new ResponseEntity<>(commonList, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //list of usernames that has submitted any available timeslots to this project
    @GetMapping("/timeslot/members/{projectTitle}")
    public ResponseEntity<List<String>> membersSubmitted(@PathVariable String projectTitle) {
        try {
            List<String> commonList = timeSlotService.membersSubmitted(projectTitle);
            return new ResponseEntity<>(commonList, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //confirm whether there are any timeslots selected in the group
    @GetMapping("/timeslot/inSession/{projectTitle}")
    public ResponseEntity<Boolean> inSession(@PathVariable String projectTitle) {
        try {
            Boolean inSession = timeSlotService.projNonEmpty(projectTitle);
            return new ResponseEntity<>(inSession ,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
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
