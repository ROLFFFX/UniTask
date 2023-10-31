package com.teamone.unitask.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "project")
public class Project {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "project_id")
    @SequenceGenerator(
            name = "project_sequence",
            sequenceName = "project_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "project_sequence"
    )
    private Long projectId;
    @Column(name = "project_title", nullable = false)
    private String projectTitle = "New Project";
    @ManyToOne
    @JoinColumn(name = "master_user_id")
    private AppUser masterUserId;
    @ManyToMany(mappedBy = "participatedProjectsId")
    private Set<AppUser> listMemberId;


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
    public AppUser getMasterUserId() {
        return masterUserId;
    }

    public void setMasterUserId(AppUser masterUserId) {
        this.masterUserId = masterUserId;
    }

    public Set<AppUser> getListMemberId() {
        return listMemberId;
    }

    public void setListMemberId(Set<AppUser> listMemberId) {
        this.listMemberId = listMemberId;
    }
}
