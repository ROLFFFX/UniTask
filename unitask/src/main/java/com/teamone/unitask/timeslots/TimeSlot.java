package com.teamone.unitask.timeslots;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

/**
 * Entity representing a time slot in the context of project management.
 * Each time slot is associated with a specific project and user, and has defined start and end times.
 */
@Entity
@NoArgsConstructor
@Table(name = "timeslot")
public class TimeSlot {

    /**
     * Unique identifier for the time slot.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "timeslot_id")
    private Long timeSlotId;

    /**
     * The start time of the time slot.
     */
    @NotNull
    private ZonedDateTime startTime;

    /**
     * The end time of the time slot.
     */
    @NotNull
    private ZonedDateTime endTime;

    /**
     * The user to whom this time slot is assigned.
     * Uses lazy fetching and is involved in a many-to-one relationship with the User entity.
     */
    @JsonBackReference("user-timeslots")
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id")
    private User userAssigned;

    /**
     * The project to which this time slot belongs.
     * Uses lazy fetching and is involved in a many-to-one relationship with the Project entity.
     */
    @JsonBackReference("project-timeslots")
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "project_id")
    private Project projectBelonged;

    // Getters and Setters
    /**
     * Gets the unique identifier of the time slot.
     *
     * @return The unique ID of the time slot.
     */
    public Long getTimeSlotId() {
        return timeSlotId;
    }

    /**
     * Sets the unique identifier of the time slot.
     *
     * @param timeSlotId The unique ID to be set for the time slot.
     */
    public void setTimeSlotId(Long timeSlotId) {
        this.timeSlotId = timeSlotId;
    }

    /**
     * Gets the start time of the time slot.
     *
     * @return The start time of the time slot.
     */
    public ZonedDateTime getStartTime() {
        return startTime;
    }

    /**
     * Sets the start time of the time slot.
     *
     * @param startTime The start time to be set for the time slot.
     */
    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    /**
     * Gets the end time of the time slot.
     *
     * @return The end time of the time slot.
     */
    public ZonedDateTime getEndTime() {
        return endTime;
    }

    /**
     * Sets the end time of the time slot.
     *
     * @param endTime The end time to be set for the time slot.
     */
    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    /**
     * Gets the user assigned to the time slot.
     *
     * @return The user assigned to the time slot.
     */
    public User getUserAssigned() {
        return userAssigned;
    }

    /**
     * Sets the user assigned to the time slot.
     *
     * @param userAssigned The user to be assigned to the time slot.
     */
    public void setUserAssigned(User userAssigned) {
        this.userAssigned = userAssigned;
    }

    /**
     * Gets the project to which the time slot belongs.
     *
     * @return The project to which the time slot belongs.
     */
    public Project getProjectBelonged() {
        return projectBelonged;
    }

    /**
     * Sets the project to which the time slot belongs.
     *
     * @param projectBelonged The project to be associated with the time slot.
     */
    public void setProjectBelonged(Project projectBelonged) {
        this.projectBelonged = projectBelonged;
    }
}