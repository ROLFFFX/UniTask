package com.teamone.unitask.meetings;

import com.teamone.unitask.projects.Project;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "meeting")
public class Meeting {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "meeting_id")
    @SequenceGenerator(
            name = "meeting_sequence",
            sequenceName = "meeting_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "meeting_sequence"
    )
    private Long meetingId;
    @Column(name = "title", nullable = false)
    private String title = "New Meeting";
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project projectId;

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

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
