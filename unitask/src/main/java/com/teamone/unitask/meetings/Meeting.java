package com.teamone.unitask.meetings;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.teamone.unitask.projects.Project;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

/**
 * Represents a meeting within a project. This entity class stores information about a meeting, including its
 * title, start and end times, and associated project. It is linked to the 'meeting' table in the database.
 */
@Entity
@Table(name = "meeting")
public class Meeting {

    // Fields

    /**
     * The unique identifier for the meeting. This ID is auto-generated and used as the primary key in the 'meeting' table.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id")
    private Long meetingId;

    /**
     * The title of the meeting. It is a mandatory field with a default value of "New Meeting".
     */
    @NotBlank
    @Column(name = "title")
    private String title = "New Meeting";

    /**
     * The start time of the meeting. It must be specified and cannot be null.
     */
    @NotNull
    @Column(name = "start_time")
    private ZonedDateTime startTime;

    /**
     * The end time of the meeting. It must be specified and cannot be null.
     */
    @NotNull
    @Column(name = "end_time")
    private ZonedDateTime endTime;

    // Foreign keys

    /**
     * The project associated with the meeting. It's a many-to-one relationship as multiple meetings
     * can be associated with a single project. It uses lazy fetching and merge & persist cascading.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "project_id")
    @JsonBackReference("project-meeting")
    private Project projectId;

    // Constructors

    /**
     * Default constructor for creating an instance of Meeting.
     */
    public Meeting() {

    }

    /**
     * Constructs a new Meeting with the specified title, start time, and end time.
     *
     * @param title     The title of the meeting.
     * @param startTime The start time of the meeting.
     * @param endTime   The end time of the meeting.
     */
    public Meeting(String title, ZonedDateTime startTime, ZonedDateTime endTime) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getter and Setter methods

    /**
     * Gets the meeting ID.
     *
     * @return The ID of the meeting.
     */
    public Long getMeetingId() {
        return meetingId;
    }

    /**
     * Sets the meeting ID.
     *
     * @param meetingId The new ID of the meeting.
     */
    public void setMeetingId(Long meetingId) {
        this.meetingId = meetingId;
    }

    /**
     * Gets the title of the meeting.
     *
     * @return The title of the meeting.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the title of the meeting.
     *
     * @param title The new title of the meeting.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets the start time of the meeting.
     *
     * @return The start time of the meeting.
     */
    public ZonedDateTime getStartTime() {
        return startTime;
    }

    /**
     * Sets the start time of the meeting.
     *
     * @param startTime The new start time of the meeting.
     */
    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    /**
     * Gets the end time of the meeting.
     *
     * @return The end time of the meeting.
     */
    public ZonedDateTime getEndTime() {
        return endTime;
    }

    /**
     * Sets the end time of the meeting.
     *
     * @param endTime The new end time of the meeting.
     */
    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    /**
     * Gets the associated project of the meeting.
     *
     * @return The associated project.
     */
    public Project getProjectId() {
        return projectId;
    }

    /**
     * Sets the associated project of the meeting.
     *
     * @param projectId The new associated project.
     */
    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}