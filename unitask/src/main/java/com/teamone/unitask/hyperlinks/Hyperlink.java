package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.projects.Project;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "hyperlink")
public class Hyperlink {

    /**
     * fields
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hyperlink_id")
    private Long hyperlinkId;

    @NotBlank
    private String title;

    @NotBlank
    @Size(max = 500)
    private String url;

    /**
     * foreign keys
     */

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private Project projectId;

    /**
     * methods
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

    public void setHyperlinkId(Long hyperlinkId) {
        this.hyperlinkId = hyperlinkId;
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
