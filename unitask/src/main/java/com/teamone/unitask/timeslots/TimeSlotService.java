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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.*;
import java.util.stream.Collectors;

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

    public List<TimeSlot> get(Long projectId, String token){
        User thisUser = userService.getUserEmailFromToken(token);
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

    public List<TimeSlot> calcCommon(Long projectId) {
        List<TimeSlot> projectTS = new ArrayList<>(projectRepository.findByProjectId(projectId).getTimeSlots());

        //set of users that has submitted some timeslots to the project
        Set<User> tsUser = new HashSet<>();
        projectTS.forEach(ts -> tsUser.add(ts.getUserAssigned()));

        // map timeslots to the set of users that share the timeslot
        Map<TimeSlot, Set<User>> ts2Users = new HashMap<>();
        for (TimeSlot ts : projectTS) {ts2Users.computeIfAbsent(ts, k -> new HashSet<>()).add(ts.getUserAssigned());}

        // Filter timeslots -> only common timeslots
        projectTS = ts2Users.entrySet().stream()
                .filter(entry -> entry.getValue().containsAll(tsUser))
                .map(Map.Entry::getKey)
                .toList();

        //merge consecutive timeslots into larger timeslots
        projectTS.sort(Comparator.comparing(TimeSlot::getStartTime)); //sort by start time in ascending order

        List<TimeSlot> commonTS = new ArrayList<>();
        TimeSlot curCommonTS = new TimeSlot();

        ListIterator<TimeSlot> i = projectTS.listIterator(0);
        TimeSlot cur = projectTS.get(0);
        TimeSlot prev = projectTS.get(0);
        while (i.hasNext()) {
            if(i.hasPrevious()){ //not first time slot
                prev = i.previous();
                cur = i.next();
            }
            if (!i.hasPrevious() || !cur.getStartTime().equals(prev.getEndTime())) { //(first timeslot or) disjoint 1 ~ starttime
                curCommonTS.setStartTime(cur.getStartTime());
                while (i.hasNext()) {
                    cur = i.next();
                    prev = i.previous();
                    if (!cur.getStartTime().equals(prev.getEndTime())) { //disjoint 2 ~ endtime
                        curCommonTS.setEndTime(prev.getEndTime());
                        commonTS.add(curCommonTS);
                        break;
                    }
                    i.next();
                }
                if (!i.hasNext()) {//no disjoint 2, reached last, curEnd ~ endtime
                    curCommonTS.setEndTime(cur.getEndTime());
                    commonTS.add(curCommonTS);
                    break;
                }
            }
            i.next();
        }

        return commonTS;
    }
}
