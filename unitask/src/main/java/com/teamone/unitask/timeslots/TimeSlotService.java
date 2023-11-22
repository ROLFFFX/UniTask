package com.teamone.unitask.timeslots;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.meetings.Meeting;
import com.teamone.unitask.meetings.MeetingRepository;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.NotWritablePropertyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.*;

@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    @Autowired
    public TimeSlotService(TimeSlotRepository timeSlotRepository,
                           ProjectRepository projectRepository,
                           UserRepository userRepository)
    {
        this.timeSlotRepository=timeSlotRepository;
        this.projectRepository=projectRepository;
        this.userRepository=userRepository;
    }
    public List<TimeSlot> save(Long projectId, Long userId, List<TimeSlot> timeSlots){
        Project thisProj = projectRepository.findByProjectId(projectId);
        User thisUser = userRepository.findById(userId).orElse(null);
        for (TimeSlot ts : timeSlots) {
            ts.setProjectBelonged(thisProj);
            ts.setUserAssigned(thisUser);
        }
        return timeSlotRepository.saveAll(timeSlots);
    }

    public List<TimeSlot> get(Long projectId, Long userId) {
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectId(projectId).getTimeSlots());
        //intersection:
        timeSlots.retainAll(userRepository.findById(userId).get().getHas_timeslots()); //exception if user does not exist
        return new ArrayList<>(timeSlots);
    }

    public void deleteAllTS(Long projectId, Long userId) {
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectId(projectId).getTimeSlots());
        //intersection:
        timeSlots.retainAll(userRepository.findById(userId).get().getHas_timeslots()); //exception if user does not exist
        timeSlotRepository.deleteAllInBatch(new ArrayList<>(timeSlots));
    }


    public void deleteOneTS(Long timeSlotId) {
        timeSlotRepository.deleteById(timeSlotId);
    }
}
