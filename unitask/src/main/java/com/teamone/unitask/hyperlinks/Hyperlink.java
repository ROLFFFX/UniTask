package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.projects.Project;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


/**
 * Entity class for Hyperlink.
 */
@Entity
@Table(name = "hyperlink")
public class Hyperlink {

    /**
     * fields
     */

    // Hyperlink id, the key of the entity.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hyperlink_id")
    private Long hyperlinkId;

    // The name of the hyperlink.
    @NotBlank
    private String title;

    // URL of the hyperlink.
    @NotBlank
    @Size(max = 1000)
    private String url;

    /**
     * foreign keys
     */

    // The project that the hyperlink is associated with.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Project projectId;

    /**
     * methods; the constructors, and getters and setters for each field
     */

    // Default constructor.
    public Hyperlink() {

    }

    /**
     * Constructor for Hyperlink with title and URL.
     *
     * @param title The name of the hyperlink.
     * @param url   The URL of the hyperlink.
     */
    public Hyperlink(String title, String url) {
        this.title = title;
        this.url = url;
    }

    /**
     * Getter for HyperlinkId.
     *
     * @return The HyperlinkId.
     */
    public Long getHyperlinkId() {
        return hyperlinkId;
    }

    /**
     * Getter for Title.
     *
     * @return The title of the hyperlink.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Setter for Title.
     *
     * @param title The title to set for the hyperlink.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Getter for URL.
     *
     * @return The URL of the hyperlink.
     */
    public String getUrl() {
        return url;
    }

    /**
     * Setter for URL.
     *
     * @param url The URL to set for the hyperlink.
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Getter for ProjectId.
     *
     * @return The ProjectId associated with the hyperlink.
     */
    public Project getProjectId() {
        return projectId;
    }

    /**
     * Setter for ProjectId.
     *
     * @param projectId The ProjectId to set for the hyperlink.
     */
    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
