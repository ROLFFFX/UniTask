package com.teamone.unitask.meetings;

import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Service class for managing meeting data. It interacts with repositories to perform CRUD operations on meetings.
 */
@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final ProjectRepository projectRepository;

    /**
     * Constructs a MeetingService with necessary dependencies.
     *
     * @param meetingRepository Repository for meeting data access.
     * @param projectRepository Repository for project data access.
     */
    @Autowired
    public MeetingService(MeetingRepository meetingRepository,
                          ProjectRepository projectRepository)
    {
        this.projectRepository = projectRepository;
        this.meetingRepository = meetingRepository;
    }

    /**
     * Retrieves a list of meetings associated with a given project.
     *
     * @param projectTitle The title of the project.
     * @return A list of meetings related to the specified project.
     */
    public List<Meeting> get(String projectTitle){
        return new ArrayList<>(projectRepository.findByProjectTitle(projectTitle).getMeetings());
    }

    /**
     * Creates and saves a new meeting for a specified project.
     *
     * @param projectTitle Title of the project to which the meeting is to be added.
     * @param title        Title of the meeting.
     * @param startTime    Start time of the meeting.
     * @param endTime      End time of the meeting.
     * @return The newly created and saved meeting.
     */
    public Meeting save(String projectTitle, String title, ZonedDateTime startTime, ZonedDateTime endTime){
        Meeting new_meeting = new Meeting(title, startTime, endTime);
        Project thisProj = projectRepository.findByProjectTitle(projectTitle);
        new_meeting.setProjectId(thisProj);
        meetingRepository.save(new_meeting);
        return new_meeting;
    }

    /**
     * Deletes a specified meeting from a project.
     *
     * @param projectTitle Title of the project from which the meeting is to be deleted.
     * @param meetingId    ID of the meeting to be deleted.
     * @return The deleted meeting.
     * @throws NoSuchElementException if the meeting or project is not found.
     */
    public Meeting delete(String projectTitle, Long meetingId) throws NoSuchElementException {
        Project project = projectRepository.findByProjectTitle(projectTitle);
        Meeting meeting = meetingRepository.findById(meetingId).orElse(null);
        if (meeting != null && meeting.getProjectId().equals(project)) {
            meetingRepository.delete(meeting);
        } else {
            throw new NoSuchElementException("Meeting with ID " + meetingId + " not found in project " + projectTitle);
        }
        return meeting;
    }


    /**
     * Updates a meeting's details.
     *
     * @param projectTitle  Title of the project where the meeting is located.
     * @param updatedMeeting Meeting object with updated details.
     * @return The updated meeting.
     * @throws NoSuchElementException if the meeting or project is not found.
     */
    public Meeting update(String projectTitle, Meeting updatedMeeting) throws NoSuchElementException {
        Project project = projectRepository.findByProjectTitle(projectTitle);
        Meeting existingMeeting = meetingRepository.findById(updatedMeeting.getMeetingId()).orElse(null);
        if (existingMeeting != null && existingMeeting.getProjectId().equals(project)) {
            existingMeeting.setTitle(updatedMeeting.getTitle());
            existingMeeting.setStartTime(updatedMeeting.getStartTime());
            existingMeeting.setEndTime(updatedMeeting.getEndTime());
        } else {
            throw new NoSuchElementException("Meeting with ID " + updatedMeeting.getMeetingId() + " not found in project " + projectTitle);
        }
        return meetingRepository.save(existingMeeting);
    }
}