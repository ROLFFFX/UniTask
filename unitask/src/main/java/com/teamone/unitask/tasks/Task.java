package com.teamone.unitask.tasks;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.projects.Project;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;


/**
 * The task Entity class
 */
@Entity
@Table(name = "task")
@NoArgsConstructor
public class Task {

    /**
     * fields
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId;

    @NotBlank
    private String title = "Add a title";

    @NotBlank
    private String status = "Not Started";

    private LocalDateTime expectedCompleteTime;

    private Integer taskPoints = 1;

    private Long parentTaskId = null;

    private LocalDateTime taskCreationTime = LocalDateTime.now();

    /**
     * foreign keys
     */

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "parentTask_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "parent_task_Id")
//    private Task parentTaskId = null;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Project projectBelonged;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User taskMemberAssigned;

    /**
     * mapped by
     */

//    @OneToMany(mappedBy = "parentTaskId")
//    @JsonBackReference
//    private Set<Task> childrenTasks;


    /**
     * methods
     */

//    public Task() {
//
//    }
//
//    public Task(String title,
//                String status,
//                LocalDateTime expectedCompleteTime,
//                Integer taskPoints) {
//        this.title = title;
//        this.status = status;
//        this.expectedCompleteTime = expectedCompleteTime;
//        this.taskPoints = taskPoints;
//    }

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

    public Long getParentTaskId() {
        return parentTaskId;
    }

    public void setParentTaskId(Long parentTaskId) {
        this.parentTaskId = parentTaskId;
    }

    public Project getProjectBelonged() {
        return projectBelonged;
    }

    public void setProjectBelonged(Project projectBelonged) {
        this.projectBelonged = projectBelonged;
    }

    public User getTaskMemberAssigned() {
        return taskMemberAssigned;
    }

    public void setTaskMemberAssigned(User taskMemberAssigned) {
        this.taskMemberAssigned = taskMemberAssigned;
    }

//    public Set<Task> getChildrenTasks() {
//        return childrenTasks;
//    }
//
//    public void setChildrenTasks(Set<Task> childrenTasks) {
//        this.childrenTasks = childrenTasks;
//    }


    public LocalDateTime getTaskCreationTime() {
        return taskCreationTime;
    }

    public void setTaskCreationTime(LocalDateTime taskCreationTime) {
        this.taskCreationTime = taskCreationTime;
    }
}
