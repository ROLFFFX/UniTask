package com.teamone.unitask.timeslots;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@NoArgsConstructor
@Table(name = "timeslot")
public class TimeSlot {

    /**
     * fields
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "timeslot_id")
    private Long timeSlotId;

    @NotBlank
    private LocalDateTime startTime;

    @NotBlank
    private LocalDateTime endTime;

    /**
     * foreign keys
     */

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User userAssigned;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private Project projectBelonged;


    /**
     * methods
     */



    public Long getTimeSlotId() {
        return timeSlotId;
    }

    public void setTimeSlotId(Long timeSlotId) {
        this.timeSlotId = timeSlotId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public User getUserAssigned() {
        return userAssigned;
    }

    public void setUserAssigned(User userAssigned) {
        this.userAssigned = userAssigned;
    }

    public Project getProjectBelonged() {
        return projectBelonged;
    }

    public void setProjectBelonged(Project projectBelonged) {
        this.projectBelonged = projectBelonged;
    }
}
