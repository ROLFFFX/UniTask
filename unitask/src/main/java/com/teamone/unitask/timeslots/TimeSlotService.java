package com.teamone.unitask.timeslots;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.meetings.Meeting;
import com.teamone.unitask.onboard.UserService;
import com.teamone.unitask.onboard.confirmationtoken.ConfirmationTokenRepository;
import com.teamone.unitask.onboard.confirmationtoken.ConfirmationToken;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.NotWritablePropertyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.*;

@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;
    private final ProjectRepository projectRepository;

    private final UserService userService;

    @Autowired
    public TimeSlotService(TimeSlotRepository timeSlotRepository,
                           ProjectRepository projectRepository,
                           UserService userService)
    {
        this.timeSlotRepository=timeSlotRepository;
        this.projectRepository=projectRepository;
        this.userService=userService;
    }
    public List<TimeSlot> save(Long projectId, String token, List<TimeSlot> timeSlots){
        Project thisProj = projectRepository.findByProjectId(projectId);
        User thisUser = userService.getUserEmailFromToken(token);
        for (TimeSlot ts : timeSlots) {
            ts.setProjectBelonged(thisProj);
            ts.setUserAssigned(thisUser);
        }
        return timeSlotRepository.saveAll(timeSlots);
    }

    public List<TimeSlot> get(Long projectId, String token) throws ResourceNotFoundException{
        User thisUser;
        try{
            thisUser = userService.getUserEmailFromToken(token);
        }catch (IllegalArgumentException e){
            throw new ResourceNotFoundException("failed");
        }
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectId(projectId).getTimeSlots());
        //intersection:
        timeSlots.retainAll(thisUser.getHas_timeslots());
        return new ArrayList<>(timeSlots);
    }

    public void deleteAllTS(Long projectId, String token) {
        User thisUser = userService.getUserEmailFromToken(token);
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectId(projectId).getTimeSlots());
        //intersection:
        timeSlots.retainAll(thisUser.getHas_timeslots());
        timeSlotRepository.deleteAllInBatch(new ArrayList<>(timeSlots));
    }


    public void deleteOneTS(Long timeSlotId) {
        timeSlotRepository.deleteById(timeSlotId);
    }
}
