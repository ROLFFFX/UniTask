package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.projects.Project;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


/**
 * The Hyperlink entity;
 */
@Entity
@Table(name = "hyperlink")
public class Hyperlink {

    /**
     * fields
     */

    // hyperlink id, the key of the entity;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hyperlink_id")
    private Long hyperlinkId;

    // the name of the hyperlink;
    @NotBlank
    private String title;

    // url of the hyperlink;
    @NotBlank
    @Size(max = 1000)
    private String url;

    /**
     * foreign keys
     */

    // the project that the hyperlink is at;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Project projectId;

    /**
     * methods; the constructors, and getters and setters for each field
     */


    public Hyperlink() {

    }

    public Hyperlink(String title, String url) {
        this.title = title;
        this.url = url;
    }

    public Long getHyperlinkId() {
        return hyperlinkId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
