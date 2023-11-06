package com.teamone.unitask.projects;

import com.teamone.unitask.hyperlinks.Hyperlink;
import com.teamone.unitask.meetings.Meeting;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.tasks.Task;
import com.teamone.unitask.timeslots.TimeSlot;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "project",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "projectTitle")
        })
public class Project {

    /**
     * fields
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column(nullable = false)
    private String projectTitle;

    /**
     * foreign keys
     */

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "master_user_id")
    private User masterUserId;

    /**
     * mapped by
     */

    @ManyToMany(mappedBy = "projectsJoined")
    private Collection<User> users_participated;

    @OneToMany(mappedBy = "projectBelonged")
    private Collection<TimeSlot> timeSlots;

    @OneToMany(mappedBy = "projectBelonged")
    private Collection<Task> tasks;

    @OneToMany(mappedBy = "projectId")
    private Collection<Meeting> meetings;

    @OneToMany(mappedBy = "projectId")
    private Collection<Hyperlink> hyperlinks;

    /**
     * methods
     */

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public User getMasterUserId() {
        return masterUserId;
    }

    public void setMasterUserId(User masterUserId) {
        this.masterUserId = masterUserId;
    }

    public Collection<User> getUsers_participated() {
        return users_participated;
    }

    public void setUsers_participated(Collection<User> users_participated) {
        this.users_participated = users_participated;
    }

    public Collection<TimeSlot> getTimeSlots() {
        return timeSlots;
    }

    public void setTimeSlots(Collection<TimeSlot> timeSlots) {
        this.timeSlots = timeSlots;
    }

    public Collection<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Collection<Task> tasks) {
        this.tasks = tasks;
    }

    public Collection<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(Collection<Meeting> meetings) {
        this.meetings = meetings;
    }

    public Collection<Hyperlink> getHyperlinks() {
        return hyperlinks;
    }

    public void setHyperlinks(Collection<Hyperlink> hyperlinks) {
        this.hyperlinks = hyperlinks;
    }
}
