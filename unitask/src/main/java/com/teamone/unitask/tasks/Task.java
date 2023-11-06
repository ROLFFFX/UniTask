package com.teamone.unitask.tasks;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "task")
public class Task {

    /**
     * fields
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId;

    @NotBlank
    private String title;

    @NotBlank
    private String status;

    @NotBlank
    private boolean isChildrenTask;

    private LocalDateTime expectedCompleteTime;

    @NotBlank
    private Integer taskPoints;

    /**
     * foreign keys
     */

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "parentTask_Id")
    private Task parentTaskId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private Project projectBelonged;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User taskMemberAssigned;

    /**
     * mapped by
     */

    @OneToMany(mappedBy = "parentTaskId")
    private Collection<Task> childrenTasks;


    /**
     * methods
     */

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

    public Task getParentTaskId() {
        return parentTaskId;
    }

}
