package com.teamone.unitask.projects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.teamone.unitask.hyperlinks.Hyperlink;
import com.teamone.unitask.meetings.Meeting;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.report.Report;
import com.teamone.unitask.tasks.Task;
import com.teamone.unitask.timeslots.TimeSlot;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.*;


/**
 * Entity class representing the Project table.
 */
@Entity
@Table(name = "project",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "projectTitle")
        })
public class Project {

    /**
     * fields
     */

    // Project ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    // Project title
    @Column(nullable = false)
    @Size(max = 1000)
    private String projectTitle;

    // Project creation time
    private LocalDateTime workSpaceCreationTime = LocalDateTime.now();

    /**
     * foreign keys
     */

    // User who is the master of the project
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "master_user_id")
    private User masterUserId = null;

    // User who is the master of the project
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

    // Time slots associated with the project
    @JsonManagedReference("project-timeslots")
    @OneToMany(mappedBy = "projectBelonged")
    private Collection<TimeSlot> timeSlots;

    // Tasks associated with the project
    @JsonIgnore
    @OneToMany(mappedBy = "projectBelonged",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.REFRESH
            })
    private Set<Task> tasks;

    // Meetings associated with the project
    @JsonManagedReference("project-meeting")
    @OneToMany(mappedBy = "projectId")
    private Collection<Meeting> meetings;

    // Hyperlinks associated with the project
    @JsonIgnore
    @OneToMany(mappedBy = "projectId",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.REFRESH
            })
    private Set<Hyperlink> hyperlinks = new HashSet<>();

    // Reports associated with the project
    @JsonIgnore
    @OneToMany(mappedBy = "projectId",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.REFRESH
            })
    private Set<Report> reports = new HashSet<>();

    /**
     * methods; constructors, getters, and setters
     */

    /**
     * Default constructor
     */
    public Project() {

    }

    /**
     * Constructor with project title as input
     * @param projectTitle title of the project
     */
    public Project(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    /**
     * Getter for project ID.
     *
     * @return The project ID.
     */
    public Long getProjectId() {
        return projectId;
    }

    /**
     * Getter for project title.
     *
     * @return The project title.
     */
    public String getProjectTitle() {
        return projectTitle;
    }

    /**
     * Setter for project title.
     *
     * @param projectTitle The new project title.
     */
    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    /**
     * Getter for the master user ID.
     *
     * @return The master user ID.
     */
    public User getMasterUserId() {
        return masterUserId;
    }

    /**
     * Setter for the master user ID.
     *
     * @param masterUserId The new master user ID.
     */
    public void setMasterUserId(User masterUserId) {
        this.masterUserId = masterUserId;
    }

    /**
     * Getter for the set of users participating in the project.
     *
     * @return The set of users.
     */
    public Set<User> getUsers() {
        return users;
    }

    /**
     * Setter for the set of users participating in the project.
     *
     * @param users The new set of users.
     */
    public void setUsers(Set<User> users) {
        this.users = users;
    }

    /**
     * Getter for time slots associated with the project.
     *
     * @return The collection of time slots.
     */
    public Collection<TimeSlot> getTimeSlots() {
        return timeSlots;
    }

    /**
     * Setter for time slots associated with the project.
     *
     * @param timeSlots The new collection of time slots.
     */
    public void setTimeSlots(Collection<TimeSlot> timeSlots) {
        this.timeSlots = timeSlots;
    }

    /**
     * Getter for tasks associated with the project.
     *
     * @return The set of tasks.
     */
    public Set<Task> getTasks() {
        return tasks;
    }

    /**
     * Getter for tasks associated with the project.
     *
     * @return The set of tasks.
     */
    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    /**
     * Getter for meetings associated with the project.
     *
     * @return The collection of meetings.
     */
    public Collection<Meeting> getMeetings() {
        return meetings;
    }

    /**
     * Setter for meetings associated with the project.
     *
     * @param meetings The new collection of meetings.
     */
    public void setMeetings(Collection<Meeting> meetings) {
        this.meetings = meetings;
    }

    /**
     * Getter for hyperlinks associated with the project.
     *
     * @return The set of hyperlinks.
     */
    public Set<Hyperlink> getHyperlinks() {
        return hyperlinks;
    }

    /**
     * Setter for hyperlinks associated with the project.
     *
     * @param hyperlinks The new set of hyperlinks.
     */
    public void setHyperlinks(Set<Hyperlink> hyperlinks) {
        this.hyperlinks = hyperlinks;
    }

    /**
     * Getter for project creation time.
     *
     * @return The project creation time.
     */
    public LocalDateTime getWorkSpaceCreationTime() {
        return workSpaceCreationTime;
    }

    /**
     * Setter for project creation time.
     *
     * @param workSpaceCreationTime The new project creation time.
     */
    public void setWorkSpaceCreationTime(LocalDateTime workSpaceCreationTime) {
        this.workSpaceCreationTime = workSpaceCreationTime;
    }

    /**
     * Getter for reports associated with the project.
     *
     * @return The set of reports.
     */
    public Set<Report> getReports() {
        return reports;
    }

    /**
     * Setter for reports associated with the project.
     *
     * @param reports The new set of reports.
     */
    public void setReports(Set<Report> reports) {
        this.reports = reports;
    }
}
