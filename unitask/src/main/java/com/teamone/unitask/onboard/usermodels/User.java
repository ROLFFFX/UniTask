package com.teamone.unitask.onboard.usermodels;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.teamone.unitask.onboard.confirmationtoken.ConfirmationToken;
import com.teamone.unitask.onboard.usermodels.Role;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.tasks.Task;
import com.teamone.unitask.timeslots.TimeSlot;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.*;


/**
 * The Entity class for user.
 */
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {

    /**
     * fields
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The username of the user.
    @NotBlank
    @Size(max = 20)
    private String username;

    // The email address of the user.
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    // The password of the user.
    @NotBlank
    @Size(max = 120)
    private String password;

    // Indicates whether the user is enabled or disabled.
    private boolean enabled;

    /**
     * foreign keys
     */

    // Set of roles associated with the user.
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    // Set of projects associated with the user.
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.ALL
            })
    @JoinTable(name = "user_projects",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "project_id") })
    private Set<Project> projects = new HashSet<>();

    /**
     * mapped by
     */

    // Collection of confirmation tokens associated with the user.
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Collection<ConfirmationToken> confirmationTokens;

    // Set of projects mastered by the user.
    @JsonIgnore
    @OneToMany(mappedBy = "masterUserId")
    private Set<Project> mastered_projects;

    // Collection of time slots assigned to the user.
    @JsonManagedReference("user-timeslots")
    @OneToMany(mappedBy = "userAssigned")
    private Collection<TimeSlot> has_timeslots;

    // Set of tasks assigned to the user.
    @JsonIgnore
    @OneToMany(mappedBy = "taskMemberAssigned",
            cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE,
                CascadeType.REFRESH
            })
    private Set<Task> tasks = new HashSet<>();


    /**
     * methods
     */

    /**
     * Default constructor for JPA.
     */
    public User() {
    }

    /**
     * Parameterized constructor to create a user with username, email, and password.
     *
     * @param username The username of the user.
     * @param email    The email address of the user.
     * @param password The password of the user.
     */
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.enabled = false;
    }

    /**
     * Project methods
     */

    /**
     * Adds a project to the user's set of projects and vice versa.
     *
     * @param project The project to be added.
     */
    public void addProject(Project project) {
        this.projects.add(project);
        project.getUsers().add(this);
    }

    /**
     * Removes a project from the user's set of projects and vice versa based on the project ID.
     *
     * @param projectId The ID of the project to be removed.
     */
    public void removeProject(Long projectId) {
        Project project = this.projects.stream().filter(t -> t.getProjectId() == projectId).findFirst().orElse(null);
        if (project != null) {
            this.projects.remove(project);
            project.getUsers().remove(this);
        }
    }

    /**
     * Gets the set of projects associated with the user.
     *
     * @return The set of projects.
     */
    public Set<Project> getProjects() {
        return projects;
    }

    /**
     * Sets the set of projects associated with the user.
     *
     * @param projects The set of projects to be set.
     */
    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    /**
     * Other methods
     */

    /**
     * Gets the ID of the user.
     *
     * @return The user ID.
     */
    public Long getId() {
        return id;
    }

    /**
     * Gets the username of the user.
     *
     * @return The username.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user.
     *
     * @param username The username to be set.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the email address of the user.
     *
     * @return The email address.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address of the user.
     *
     * @param email The email address to be set.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the password of the user.
     *
     * @return The password.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the user.
     *
     * @param password The password to be set.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Checks if the user is enabled.
     *
     * @return True if enabled, false otherwise.
     */
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * Sets whether the user is enabled.
     *
     * @param enabled True to enable the user, false to disable.
     */
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * Gets the set of roles associated with the user.
     *
     * @return The set of roles.
     */
    public Set<Role> getRoles() {
        return roles;
    }

    /**
     * Sets the set of roles associated with the user.
     *
     * @param roles The set of roles to be set.
     */
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    /**
     * Gets the collection of confirmation tokens associated with the user.
     *
     * @return The collection of confirmation tokens.
     */
    public Collection<ConfirmationToken> getConfirmationTokens() {
        return confirmationTokens;
    }

    /**
     * Sets the collection of confirmation tokens associated with the user.
     *
     * @param confirmationTokens The collection of confirmation tokens to be set.
     */
    public void setConfirmationTokens(Collection<ConfirmationToken> confirmationTokens) {
        this.confirmationTokens = confirmationTokens;
    }

    /**
     * Gets the set of projects mastered by the user.
     *
     * @return The set of projects mastered by the user.
     */
    public Set<Project> getMastered_projects() {
        return mastered_projects;
    }

    /**
     * Sets the set of projects mastered by the user.
     *
     * @param mastered_projects The set of projects to be set.
     */
    public void setMastered_projects(Set<Project> mastered_projects) {
        this.mastered_projects = mastered_projects;
    }

    /**
     * Gets the collection of time slots assigned to the user.
     *
     * @return The collection of time slots.
     */
    public Collection<TimeSlot> getHas_timeslots() {
        return has_timeslots;
    }

    /**
     * Sets the collection of time slots assigned to the user.
     *
     * @param has_timeslots The collection of time slots to be set.
     */
    public void setHas_timeslots(Collection<TimeSlot> has_timeslots) {
        this.has_timeslots = has_timeslots;
    }

    /**
     * Gets the set of tasks assigned to the user.
     *
     * @return The set of tasks.
     */
    public Set<Task> getTasks() {
        return tasks;
    }

    /**
     * Sets the set of tasks assigned to the user.
     *
     * @param tasks The set of tasks to be set.
     */
    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
