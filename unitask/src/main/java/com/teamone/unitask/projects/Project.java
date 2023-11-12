package com.teamone.unitask.projects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.teamone.unitask.hyperlinks.Hyperlink;
import com.teamone.unitask.meetings.Meeting;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.tasks.Task;
import com.teamone.unitask.timeslots.TimeSlot;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

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
    private User masterUserId = null;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "projects")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    /**
     * mapped by
     */

//    @ManyToMany(mappedBy = "projectsJoined", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private Collection<User> users_participated;

    @OneToMany(mappedBy = "projectBelonged")
    private Collection<TimeSlot> timeSlots;

    @OneToMany(mappedBy = "projectBelonged")
    private Collection<Task> tasks;

    @OneToMany(mappedBy = "projectId")
    private Collection<Meeting> meetings;

    @OneToMany(mappedBy = "projectId")
    private Set<Hyperlink> hyperlinks = new HashSet<>();

    /**
     * methods
     */

    public Project() {

    }

    public Project(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public Long getProjectId() {
        return projectId;
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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
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

    public Set<Hyperlink> getHyperlinks() {
        return hyperlinks;
    }

    public void setHyperlinks(Set<Hyperlink> hyperlinks) {
        this.hyperlinks = hyperlinks;
    }
}
