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
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.*;
import java.util.stream.Collectors;

import java.util.Set.*;

import static java.util.Collections.sort;

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
    public List<TimeSlot> save(String projectTitle, String token, List<TimeSlot> timeSlots){
        Project thisProj = projectRepository.findByProjectTitle(projectTitle);
        User thisUser = userService.getUserEmailFromToken(token);
        for (TimeSlot ts : timeSlots) {
            ts.setProjectBelonged(thisProj);
            ts.setUserAssigned(thisUser);
        }
        return timeSlotRepository.saveAll(timeSlots);
    }

    public List<TimeSlot> get(String projectTitle, String token){
        User thisUser = userService.getUserEmailFromToken(token);
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());
        //intersection:
        timeSlots.retainAll(thisUser.getHas_timeslots());
        return new ArrayList<>(timeSlots);
    }

    public void deleteAllTS(String projectTitle, String token) {
        User thisUser = userService.getUserEmailFromToken(token);
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());
        //intersection:
        timeSlots.retainAll(thisUser.getHas_timeslots());
        timeSlotRepository.deleteAllInBatch(new ArrayList<>(timeSlots));
    }


    public void deleteOneTS(Long timeSlotId) {
        timeSlotRepository.deleteById(timeSlotId);
    }

    public List<TimeSlot> calcCommon(String projectTitle) throws IllegalArgumentException{

        List<TimeSlot> projectTS;
        Set<User> tsUser;
        Map<ZonedDateTime, Set<User>> stTime2Users;

        projectTS = new ArrayList<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());

        //set of users that has submitted some timeslots to the project
        tsUser = new HashSet<>();
        projectTS.forEach(ts -> tsUser.add(ts.getUserAssigned()));

        // map timeslots(marked by start time) to the set of users that share the timeslot
        stTime2Users = new HashMap<>();
        for (TimeSlot ts : projectTS) {stTime2Users.computeIfAbsent(ts.getStartTime(), k -> new HashSet<>()).add(ts.getUserAssigned());}

        //Filter map timeslots -> only common timeslots shared by all users
        //create a set of startTimes that correspond to the common timeslots
        Set<ZonedDateTime> tempSet = stTime2Users.entrySet().stream()
                .filter(entry -> entry.getValue().containsAll(tsUser))
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());
        //convert set to a list
        List<ZonedDateTime> commonStTime = new ArrayList<>(tempSet);

        //if(tsUser.size()==2){ throw new IllegalArgumentException();}
        if(commonStTime.isEmpty()){ return null;}

        //merge consecutive timeslots into larger timeslots
        //projectTS.sort(Comparator.comparing(TimeSlot::getStartTime)); //sort by start time in ascending order
        sort(commonStTime); //sort in temporal order

        //merge consecutive timeslots
        List<TimeSlot> commonTS = new ArrayList<>(); //result list
        ZonedDateTime disjoint = commonStTime.get(0); //first disjoint is start
        int itr = 0;

        while(itr<commonStTime.size()) {
            TimeSlot curCommon = new TimeSlot();
            curCommon.setStartTime(disjoint);

            //find the next disjoint or reach the end (the end is the last disjoint)
            while (itr < commonStTime.size() - 1 && commonStTime.get(itr).until(commonStTime.get(itr + 1), ChronoUnit.MINUTES) == 30L) {
                itr++;
            }
            disjoint = commonStTime.get(itr).plusMinutes(30L);//left of the disjoint; end time of the current elem; end time of commonTS
            curCommon.setEndTime(disjoint);
            commonTS.add(curCommon);

            if(itr == commonStTime.size() - 1){break;}//if itr is the last in the list
            disjoint = commonStTime.get(itr+1);//right of the disjoint; start time of the next elem; start time of commonTS
            itr++;
        }

        return commonTS;
    }

    public void clearProjTS(String projectTitle) {
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());
        timeSlotRepository.deleteAllInBatch(new ArrayList<>(timeSlots));
    }

    public Boolean projNonEmpty(String projectTitle) {
        Project thisProj = projectRepository.findByProjectTitle(projectTitle);
        return !thisProj.getTimeSlots().isEmpty();
    }

    public List<String> membersSubmitted(String projectTitle) {
        List<TimeSlot> projectTS = new ArrayList<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());
        Set<User> tsUser = new HashSet<>();
        projectTS.forEach(ts -> tsUser.add(ts.getUserAssigned()));

        List<String> userNames = tsUser.stream()
                .map(User::getUsername)
                .collect(Collectors.toList());

        return userNames;
    }
}
