package com.teamone.unitask.tasks;

import com.teamone.unitask.projects.Project;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "task")
public class Task {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "task_id")
    @SequenceGenerator(
            name = "task_sequence",
            sequenceName = "task_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "task_sequence"
    )
    private Long taskId;
    @Column(name = "title", nullable = false)
    private String title = "New Task";
    @Column(name = "status", nullable = false)
    private String status = "To Do";
    // one to one relation;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_task_Id")
    private Task parentTaskId;
    @Column(name = "num_layers", nullable = false)
    private Integer numLayers = 0;
    @Column(name = "expected_complete_time")
    private LocalDateTime expectedCompleteTime;
    @Column(name = "task_points", nullable = false)
    private Integer taskPoints = 1;
    // one to many relation;
//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "assigned_member_id")
//    private List<User> assignedMemberId;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project projectId;
    //TODO: USER ASSIGNED


    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getNumLayers() {
        return numLayers;
    }

    public void setNumLayers(Integer numLayers) {
        this.numLayers = numLayers;
    }

    public void setParentTaskId(Task parentTaskId) {
        this.parentTaskId = parentTaskId;
    }

    public LocalDateTime getExpectedCompleteTime() {
        return expectedCompleteTime;
    }

    public void setExpectedCompleteTime(LocalDateTime expectedCompleteTime) {
        this.expectedCompleteTime = expectedCompleteTime;
    }

    public Integer getTaskPoints() {
        return taskPoints;
    }

    public void setTaskPoints(Integer taskPoints) {
        this.taskPoints = taskPoints;
    }

//    public List<User> getAssignedMemberId() {
//        return assignedMemberId;
//    }
//
//    public void setAssignedMemberId(List<User> assignedMemberId) {
//        this.assignedMemberId = assignedMemberId;
//    }

    public Task getParentTaskId() {
        return parentTaskId;
    }

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
