package com.teamone.unitask.meetings;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/test")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService){this.meetingService=meetingService;}

    //the list of events(meetings) selected by the group
    @GetMapping("/meeting/{projectTitle}")
    public ResponseEntity<List<Meeting>> getProjectMeetings(@PathVariable String projectTitle) {
        try {
          List<Meeting> meetings = meetingService.get(projectTitle);
          if (meetings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
          }
          return new ResponseEntity<>(meetings, HttpStatus.OK);
        } catch (Exception e) {
          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //post a new event to the table, post it to the specific project
    @PostMapping("/meeting/{projectTitle}")
    public ResponseEntity<Meeting> createMeeting(@PathVariable String projectTitle,
                                                 @RequestBody Meeting meeting) {
        try {
          Meeting new_meeting = meetingService.save(projectTitle, meeting.getTitle(),
          meeting.getStartTime(), meeting.getEndTime());
          return new ResponseEntity<>(new_meeting, HttpStatus.CREATED);
        } catch (Exception e) {
          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //delete event, respond with the deleted meeting
    @DeleteMapping("/meeting/{projectTitle}/{meetingId}")
    public ResponseEntity<Meeting> deleteMeeting(@PathVariable String projectTitle,
                                                 @PathVariable Long meetingId) {
        try {
            Meeting cur_meetings = meetingService.delete(projectTitle, meetingId);
            return new ResponseEntity<>(cur_meetings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //update event, respond with updated meeting
    @PutMapping("/meeting/{projectTitle}")
    public ResponseEntity<Meeting> updateMeeting(@PathVariable String projectTitle,
                                                 @RequestBody Meeting meeting) {
        try {
            Meeting updatedMeeting = meetingService.update(projectTitle, meeting);
            if (updatedMeeting == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedMeeting, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
