package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.projects.Project;

import javax.persistence.*;

@Entity
@Table(name = "hyperlink")
public class Hyperlink {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "hyperlink_id")
    @SequenceGenerator(
            name = "hyperlink_sequence",
            sequenceName = "hyperlink_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "hyperlink_sequence"
    )
    private Long hyperlinkId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "url", nullable = false, length = 500)
    private String url;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project projectId;


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
