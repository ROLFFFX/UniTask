package com.teamone.unitask.meetings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.teamone.unitask.meetings.*;
import com.teamone.unitask.projects.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.*;

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
