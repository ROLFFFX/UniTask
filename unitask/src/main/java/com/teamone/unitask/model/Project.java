package com.teamone.unitask.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;
    @Column(name = "project_title", nullable = false, length = 255)
    private String projectTitle = "New Project";
    // one to many relation;
//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "project_members")
//    private List<User> projectMembers;


    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

//    public List<User> getProjectMembers() {
//        return projectMembers;
//    }
//
//    public void setProjectMembers(List<User> projectMembers) {
//        this.projectMembers = projectMembers;
//    }
}
