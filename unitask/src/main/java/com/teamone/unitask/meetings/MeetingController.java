package com.teamone.unitask.meetings;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "localhost:3000/meeting", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class MeetingController {

/*    @Autowired
    MeetingRepository meetingRepository;
    */
    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService){this.meetingService=meetingService;}

    //the list of events(meetings) selected by the group
    @GetMapping("/meeting/{projectId}")
    public ResponseEntity<List<Meeting>> getProjectMeetings(@PathVariable Long projectId) {
        try {
          List<Meeting> meetings = meetingService.get(projectId);
          if (meetings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
          }
          return new ResponseEntity<>(meetings, HttpStatus.OK);
        } catch (Exception e) {
          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //post a new event to the table, post it to the specific project
    @PostMapping("/meeting/{projectId}")
    public ResponseEntity<Meeting> createMeeting(@PathVariable Long projectId,
                                                 @RequestBody Meeting meeting) {
        try {
          Meeting new_meeting = meetingService.save(projectId, meeting.getTitle(),
          meeting.getStartTime(), meeting.getEndTime());
          return new ResponseEntity<>(new_meeting, HttpStatus.CREATED);
        } catch (Exception e) {
          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //delete event, respond with the deleted meeting
    @DeleteMapping("/meeting/{projectId}/{meetingId}")
    public ResponseEntity<Meeting> deleteMeeting(@PathVariable Long projectId,
                                                       @PathVariable Long meetingId) {
        try {
            Meeting cur_meetings = meetingService.delete(projectId, meetingId);
            return new ResponseEntity<>(cur_meetings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //update event, respond with updated meeting
    @PutMapping("/meeting/{projectId}")
    public ResponseEntity<Meeting> updateMeeting(@PathVariable Long projectId,
                                                 @RequestBody Meeting meeting) {
        try {
            Meeting updatedMeeting = meetingService.update(projectId, meeting);
            if (updatedMeeting == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedMeeting, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
