package com.teamone.unitask.meetings;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Rest Controller for managing meetings within a project.
 * Supports operations such as retrieving, creating, updating, and deleting meetings.
 * It is cross-origin enabled for frontend.
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/test")
public class MeetingController {

    private final MeetingService meetingService;

    /**
     * Constructor for MeetingController.
     *
     * @param meetingService The service used for managing meeting data.
     */
    public MeetingController(MeetingService meetingService){
        this.meetingService=meetingService;
    }

    /**
     * Retrieves a list of meetings associated with a specific project.
     *
     * @param projectTitle The title of the project for which meetings are requested.
     * @return A response entity containing a list of meetings and the HTTP status.
     */
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

    /**
     * Creates a new meeting and adds it to a specific project.
     *
     * @param projectTitle The title of the project where the meeting will be added.
     * @param meeting The meeting object to be created.
     * @return A response entity containing the created meeting and the HTTP status.
     */
    @PostMapping("/meeting/{projectTitle}")
    public ResponseEntity<Meeting> createMeeting(@PathVariable String projectTitle,
                                                 @RequestBody Meeting meeting) {
        try {
            Meeting new_meeting = meetingService.save(projectTitle, meeting.getTitle(), meeting.getStartTime(), meeting.getEndTime());
            return new ResponseEntity<>(new_meeting, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Deletes a specific meeting from a project.
     *
     * @param projectTitle The title of the project from which the meeting will be deleted.
     * @param meetingId The ID of the meeting to be deleted.
     * @return A response entity containing the deleted meeting and the HTTP status.
     */
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

    /**
     * Updates an existing meeting within a project.
     *
     * @param projectTitle The title of the project where the meeting is located.
     * @param meeting The updated meeting information.
     * @return A response entity containing the updated meeting and the HTTP status.
     */
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
