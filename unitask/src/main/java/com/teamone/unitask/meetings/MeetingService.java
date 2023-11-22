package com.teamone.unitask.meetings;

import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final ProjectRepository projectRepository;
    @Autowired
    public MeetingService(MeetingRepository meetingRepository,
                          ProjectRepository projectRepository)
    {
        this.projectRepository=projectRepository;
        this.meetingRepository=meetingRepository;
    }

    //get the whole list of selected meetings of the project
    public List<Meeting> get(Long project_id){
        List<Meeting> meetings = new ArrayList(projectRepository.findByProjectId(project_id).getMeetings());
        return meetings;
    }

    //save new meeting to the table, at the same time to the meetings list of the project
    public Meeting save(Long project_id, String title, LocalDateTime startTime, LocalDateTime endTime){
        Meeting new_meeting = new Meeting(title, startTime, endTime);
        Project thisProj = projectRepository.findByProjectId(project_id);
        new_meeting.setProjectId(thisProj);
        meetingRepository.save(new_meeting);
        return new_meeting;
    }

    //delete meeting; respond with the deleted meeting
    public Meeting delete(Long projectId, Long meetingId) throws NoSuchElementException {
        Project project = projectRepository.findByProjectId(projectId);
        Meeting meeting = meetingRepository.findById(meetingId).orElse(null);
        if (meeting != null && meeting.getProjectId().equals(project)) {
            meetingRepository.delete(meeting);
        } else {
            throw new NoSuchElementException("Meeting with ID " + meetingId + " not found in project " + projectId);
        }
        return meeting;
    }

    //update meeting; respond with updated meeting
    public Meeting update(Long projectId, Meeting updatedMeeting) throws NoSuchElementException {
        Project project = projectRepository.findByProjectId(projectId);
        Meeting existingMeeting = meetingRepository.findById(updatedMeeting.getMeetingId()).orElse(null);
        if (existingMeeting != null && existingMeeting.getProjectId().equals(project)) {
            existingMeeting.setTitle(updatedMeeting.getTitle());
            existingMeeting.setStartTime(updatedMeeting.getStartTime());
            existingMeeting.setEndTime(updatedMeeting.getEndTime());
        } else {
            throw new NoSuchElementException("Meeting with ID " + updatedMeeting.getMeetingId() + " not found in project " + projectId);
        }
        return meetingRepository.save(existingMeeting);
    }

}


//    //getAll for test
//    public List<Meeting> getAll(@RequestBody Meeting meeting){
//        List<Meeting> meetings = new ArrayList<Meeting>();
//        meetings = meetingRepository.findAll();
//        return meetings;
//    }

//    //get the whole list of selected meetings of the project
//    public List<Meeting> get(Project project_id){
//        List<Meeting> meetings = new ArrayList<Meeting>();
//        meetingRepository.findByProjectId(project_id).forEach(meetings::add);
//        return meetings;
//    }
