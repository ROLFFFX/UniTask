package com.teamone.unitask.timeslots;

import com.teamone.unitask.onboard.UserService;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Collections.sort;

/**
 * Service class for managing time slots within a project context.
 * It handles operations like creating, retrieving, deleting, and finding common time slots.
 */
@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;
    private final ProjectRepository projectRepository;

    private final UserService userService;

    /**
     * Constructs a TimeSlotService with necessary dependencies.
     *
     * @param timeSlotRepository Repository for time slot data access.
     * @param projectRepository Repository for project data access.
     * @param userService Service for user related operations.
     */
    @Autowired
    public TimeSlotService(TimeSlotRepository timeSlotRepository,
                           ProjectRepository projectRepository,
                           UserService userService)
    {
        this.timeSlotRepository=timeSlotRepository;
        this.projectRepository=projectRepository;
        this.userService=userService;
    }

    /**
     * Saves a list of time slots associated with a specific project.
     *
     * @param projectTitle Title of the project.
     * @param token Authorization token for user identification.
     * @param timeSlots List of time slots to be saved.
     * @return List of saved time slots.
     */
    public List<TimeSlot> save(String projectTitle, String token, List<TimeSlot> timeSlots){
        Project thisProj = projectRepository.findByProjectTitle(projectTitle);
        User thisUser = userService.getUserEmailFromToken(token);
        for (TimeSlot ts : timeSlots) {
            ts.setProjectBelonged(thisProj);
            ts.setUserAssigned(thisUser);
        }
        return timeSlotRepository.saveAll(timeSlots);
    }


    /**
     * Retrieves a list of time slots for a given project and user.
     *
     * @param projectTitle Title of the project.
     * @param token Authorization token for user identification.
     * @return List of time slots.
     */
    public List<TimeSlot> get(String projectTitle, String token){
        User thisUser = userService.getUserEmailFromToken(token);
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());
        //intersection:
        timeSlots.retainAll(thisUser.getHas_timeslots());
        return new ArrayList<>(timeSlots);
    }


    /**
     * Deletes all time slots submitted by a user for a specific project.
     *
     * @param projectTitle Title of the project.
     * @param token Authorization token for user identification.
     */
    public void deleteAllTS(String projectTitle, String token) {
        User thisUser = userService.getUserEmailFromToken(token);
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());
        //intersection:
        timeSlots.retainAll(thisUser.getHas_timeslots());
        timeSlotRepository.deleteAllInBatch(new ArrayList<>(timeSlots));
    }


    /**
     * Deletes a specific time slot by its ID.
     *
     * @param timeSlotId ID of the time slot to be deleted.
     */
    public void deleteOneTS(Long timeSlotId) {
        timeSlotRepository.deleteById(timeSlotId);
    }

    /**
     * Calculates common time slots across all users of a project.
     *
     * @param projectTitle Title of the project.
     * @return List of common time slots.
     */
    public List<TimeSlot> calcCommon(String projectTitle) {

        List<TimeSlot> projectTS;
        Set<User> tsUser;
        Map<ZonedDateTime, Set<User>> stTime2Users;

        // Retrieve all time slots for the given project.
        projectTS = new ArrayList<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());

        // Set of users who have submitted time slots for this project.
        tsUser = new HashSet<>();
        projectTS.forEach(ts -> tsUser.add(ts.getUserAssigned()));

        // Map each time slot's start time to the set of users who share that time slot.
        stTime2Users = new HashMap<>();
        for (TimeSlot ts : projectTS) {
            stTime2Users.computeIfAbsent(ts.getStartTime(), k -> new HashSet<>()).add(ts.getUserAssigned());
        }

        // Filter the map to retain only those time slots shared by all users in the project.
        // This results in a set of start times representing common time slots.
        Set<ZonedDateTime> tempSet = stTime2Users.entrySet().stream()
                .filter(entry -> entry.getValue().containsAll(tsUser))
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());

        // Convert the set of common start times to a list for further processing.
        List<ZonedDateTime> commonStTime = new ArrayList<>(tempSet);

        // If no common time slots are found, return null.
        if (commonStTime.isEmpty()) {
            return null;
        }

        // Sort the list of common start times in chronological order.
        sort(commonStTime);

        // Initialize a list to store merged common time slots.
        List<TimeSlot> commonTS = new ArrayList<>();
        ZonedDateTime disjoint = commonStTime.get(0); // Starting time of the first block should still be the same.
        int itr = 0;

        // Iterate over the list of common start times to merge consecutive time slots.
        while (itr < commonStTime.size()) {
            TimeSlot curCommon = new TimeSlot();
            curCommon.setStartTime(disjoint); // Set the start time for the current common time slot.

            // Find the next disjoint (non-consecutive) time slot or reach the end of the list.
            while (itr < commonStTime.size() - 1 && commonStTime.get(itr).until(commonStTime.get(itr + 1), ChronoUnit.MINUTES) == 30L) {
                itr++;
            }

            // Set the end time of the current common time slot and add it to the results list.
            disjoint = commonStTime.get(itr).plusMinutes(30L); // End time of the current time slot.
            curCommon.setEndTime(disjoint);
            commonTS.add(curCommon);

            // Break the loop if the current iteration is the last element in the list.
            if (itr == commonStTime.size() - 1) {
                break;
            }

            // Set up the start time for the next common time slot.
            disjoint = commonStTime.get(itr + 1);
            itr++;
        }

        return commonTS;
    }


    /**
     * Clears all time slots for a given project.
     *
     * @param projectTitle Title of the project.
     */
    public void clearProjTS(String projectTitle) {
        Set<TimeSlot> timeSlots = new HashSet<>(projectRepository.findByProjectTitle(projectTitle).getTimeSlots());
        timeSlotRepository.deleteAllInBatch(new ArrayList<>(timeSlots));
    }

    /**
     * Checks whether a project has any available time slots submitted.
     *
     * @param projectTitle Title of the project.
     * @return Boolean indicating whether the project has time slots.
     */
    public Boolean projNonEmpty(String projectTitle) {
        Project thisProj = projectRepository.findByProjectTitle(projectTitle);
        return !thisProj.getTimeSlots().isEmpty();
    }

    /**
     * Retrieves a list of usernames of members who have submitted time slots for a specific project.
     *
     * @param projectTitle Title of the project.
     * @return List of usernames.
     */
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
