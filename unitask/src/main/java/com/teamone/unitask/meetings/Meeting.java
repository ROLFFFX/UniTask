package com.teamone.unitask.meetings;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.teamone.unitask.projects.Project;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

/**
 * The Meeting entity
 */
@Entity
@Table(name = "meeting")
public class Meeting {

    /*
     * fields
     */

    // meeting id, the key of the meeting table;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="meeting_id")
    private Long meetingId;

    // meeting title, with default value "New Meeting";
    @NotBlank
    @Column(name="title")
    private String title = "New Meeting";

    @NotNull
    @Column(name="start_time")
    private ZonedDateTime startTime;

    @NotNull
    @Column(name="end_time")
    private ZonedDateTime endTime;

    /**
     * foreign keys
     */

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "project_id")
    @JsonBackReference("project-meeting")
    private Project projectId;


    /**
     * methods
     */

    public Meeting() {

    }

    public Meeting(String title, ZonedDateTime startTime, ZonedDateTime endTime) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Long meetingId) {
        this.meetingId = meetingId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
