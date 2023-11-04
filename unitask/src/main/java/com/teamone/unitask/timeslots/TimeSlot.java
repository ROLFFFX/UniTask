package com.teamone.unitask.timeslots;

import com.teamone.unitask.projects.Project;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "time_slot")
public class TimeSlot {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "timeslot_id")
    @SequenceGenerator(
            name = "timeslot_sequence",
            sequenceName = "timeslot_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "timeslot_sequence"
    )
    private Long timeSlotId;
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;
//    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinTable(name = "tbl_timeslot_user", joinColumns = {@JoinColumn(name = "user_id")},
//            inverseJoinColumns = {@JoinColumn(name = "timeslot_id")})
//    private List<User> usersAvailable;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project projectId;


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

//    public List<User> getUsersAvailable() {
//        return usersAvailable;
//    }
//
//    public void setUsersAvailable(List<User> usersAvailable) {
//        this.usersAvailable = usersAvailable;
//    }

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
