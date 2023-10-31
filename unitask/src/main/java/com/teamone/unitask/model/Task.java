package com.teamone.unitask.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
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
}
