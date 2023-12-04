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
 * The Task entity class.
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

    // Title of the task
    @NotBlank
    private String title = "Add a title";

    // Status of the task
    @NotBlank
    private String status = "Not Started";

    // Expected completion time of the task
    private LocalDateTime expectedCompleteTime;

    // Points associated with the task
    private Integer taskPoints = 1;

    // Parent task's identifier, null if no parent
    private Long parentTaskId = null;

    // Creation time of the task
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

    // Project to which the task belongs
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Project projectBelonged;

    // User assigned to the task
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

    /**
     * Gets the unique identifier of the task.
     *
     * @return The task's identifier.
     */
    public Long getTaskId() {
        return taskId;
    }

    /**
     * Sets the unique identifier of the task.
     *
     * @param taskId The task's identifier.
     */
    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    /**
     * Gets the title of the task.
     *
     * @return The task's title.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the title of the task.
     *
     * @param title The task's title.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets the status of the task.
     *
     * @return The task's status.
     */
    public String getStatus() {
        return status;
    }

    /**
     * Sets the status of the task.
     *
     * @param status The task's status.
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * Gets the expected completion time of the task.
     *
     * @return The expected completion time.
     */
    public LocalDateTime getExpectedCompleteTime() {
        return expectedCompleteTime;
    }

    /**
     * Sets the expected completion time of the task.
     *
     * @param expectedCompleteTime The expected completion time.
     */
    public void setExpectedCompleteTime(LocalDateTime expectedCompleteTime) {
        this.expectedCompleteTime = expectedCompleteTime;
    }

    /**
     * Gets the task points associated with the task.
     *
     * @return The task points.
     */
    public Integer getTaskPoints() {
        return taskPoints;
    }

    /**
     * Sets the task points associated with the task.
     *
     * @param taskPoints The task points.
     */
    public void setTaskPoints(Integer taskPoints) {
        this.taskPoints = taskPoints;
    }

    /**
     * Gets the parent task's identifier.
     *
     * @return The parent task's identifier.
     */
    public Long getParentTaskId() {
        return parentTaskId;
    }

    /**
     * Sets the parent task's identifier.
     *
     * @param parentTaskId The parent task's identifier.
     */
    public void setParentTaskId(Long parentTaskId) {
        this.parentTaskId = parentTaskId;
    }

    /**
     * Gets the project to which the task belongs.
     *
     * @return The project.
     */
    public Project getProjectBelonged() {
        return projectBelonged;
    }

    /**
     * Sets the project to which the task belongs.
     *
     * @param projectBelonged The project.
     */
    public void setProjectBelonged(Project projectBelonged) {
        this.projectBelonged = projectBelonged;
    }

    /**
     * Gets the user assigned to the task.
     *
     * @return The assigned user.
     */
    public User getTaskMemberAssigned() {
        return taskMemberAssigned;
    }

    /**
     * Sets the user assigned to the task.
     *
     * @param taskMemberAssigned The assigned user.
     */
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

    /**
     * Gets the creation time of the task.
     *
     * @return The task's creation time.
     */
    public LocalDateTime getTaskCreationTime() {
        return taskCreationTime;
    }

    /**
     * Sets the creation time of the task.
     *
     * @param taskCreationTime The task's creation time.
     */
    public void setTaskCreationTime(LocalDateTime taskCreationTime) {
        this.taskCreationTime = taskCreationTime;
    }
}
